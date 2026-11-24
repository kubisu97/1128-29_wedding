/* ===========================================================================
 * memories.js — 思い出アルバム（memories.html）
 *
 * Memory Camera（写真共有アプリ）の GAS から写真の一覧を取ってきて、タイル状に並べる。
 * 写真をタップすると拡大表示し、左右スワイプ（PC は矢印・キーボード）で前後へ送れる。
 *
 * - 接続先（GAS の URL とイベントコード）は core/memories-sealed.js に合言葉で暗号化して置いてある。
 *   合言葉は新郎側・新婦側の2つで、復号できた方の中身にあるアルバムだけを見せる
 *     新郎側 … 京都観光 ＋ 結婚式 / 新婦側 … 結婚式のみ
 *   （tools/seal-memories.mjs で作る）
 * - 一度通った合言葉はこの端末に覚えておき、次からは入力なしで開く
 * - 新しい写真は 1 分半おきに取り込む
 * - localhost で ?demo（新郎側）/ ?demo=bride（新婦側）を付けると、assets/photos の写真で見た目だけ確認できる
 * =========================================================================== */
(function () {
  'use strict';

  var STORE_KEY = 'tk1129-memories-pass';
  var REFRESH = 90 * 1000;
  // 並び順＝表示順（日付順）
  var ALBUMS = [
    { id: 'kyoto', name: '京都観光', en: 'Kyoto', date: '11.28' },
    { id: 'wedding', name: '結婚式', en: 'Wedding', date: '11.29' }
  ];

  var $ = function (id) { return document.getElementById(id); };
  var gate = $('gate'), gateForm = $('gateForm'), gatePass = $('gatePass'), gateBtn = $('gateBtn'), gateErr = $('gateErr');
  var album = $('album'), tabsEl = $('tabs'), gallery = $('gallery'), statusEl = $('status'), totalEl = $('total');
  var topDate = $('topDate'), relock = $('relock');
  var lb = $('lb'), lbStage = $('lbStage'), lbImg = $('lbImg'), lbCount = $('lbCount');
  var lbAlbum = $('lbAlbum'), lbAuthor = $('lbAuthor'), lbTime = $('lbTime'), lbComment = $('lbComment');
  var lbClose = $('lbClose'), lbPrev = $('lbPrev'), lbNext = $('lbNext');

  var isLocal = /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
  var demoMatch = isLocal && location.search.match(/[?&]demo(?:=(\w+))?/);

  var config = null;
  var albums = [];              // この合言葉で見られるアルバム
  var all = [];                 // 取得した全写真
  var broken = {};              // 読み込めなかった写真の id
  var filter = 'all';
  var visible = [];             // いま一覧に出ている写真（表示順）。拡大表示の前後送りもこの順
  var lbIndex = -1;
  var lastSig = null;           // 前回描いた一覧の中身。null は「まだ一度も描いていない」（0枚でも最初は必ず描く）
  var pendingRender = false;

  /* ---------- 合言葉と復号 ---------- */
  function normalizePass(s) {
    // 全角で入れても通るように（tools/seal-memories.mjs と同じ処理）
    return String(s || '').normalize('NFKC').trim();
  }
  function fromB64(s) {
    var bin = atob(s), u = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) { u[i] = bin.charCodeAt(i); }
    return u;
  }
  function openEnvelope(env, pass) {
    var enc = new TextEncoder();
    return crypto.subtle.importKey('raw', enc.encode(pass), 'PBKDF2', false, ['deriveKey'])
      .then(function (base) {
        return crypto.subtle.deriveKey(
          { name: 'PBKDF2', salt: fromB64(env.salt), iterations: env.iter, hash: 'SHA-256' },
          base, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
      })
      .then(function (key) { return crypto.subtle.decrypt({ name: 'AES-GCM', iv: fromB64(env.iv) }, key, fromB64(env.data)); })
      .then(function (buf) { return JSON.parse(new TextDecoder().decode(buf)); });
  }
  /* 新郎側・新婦側どちらの合言葉かは、どちらで復号できるかで決まる */
  function unseal(pass) {
    var sealed = window.MEMORIES_SEALED;
    if (!sealed) { return Promise.reject(new Error('not-ready')); }
    if (!window.crypto || !crypto.subtle || !window.TextEncoder) { return Promise.reject(new Error('unsupported')); }
    var envs = Array.isArray(sealed) ? sealed : [sealed];
    return Promise.all(envs.map(function (env) {
      return openEnvelope(env, pass).then(function (cfg) { return cfg; }, function () { return null; });
    })).then(function (results) {
      var cfg = results.filter(Boolean)[0];
      if (!cfg) { throw new Error('wrong-pass'); }
      return cfg;
    });
  }

  function storeGet() { try { return localStorage.getItem(STORE_KEY); } catch (e) { return null; } }
  function storeSet(v) { try { localStorage.setItem(STORE_KEY, v); } catch (e) {} }
  function storeDel() { try { localStorage.removeItem(STORE_KEY); } catch (e) {} }

  function openGate(message) {
    gate.hidden = false;
    album.hidden = true;
    if (message) { gateErr.textContent = message; gateErr.hidden = false; }
    // カードは演出が終わってから弾んで出す（memories.css の .is-in）。
    // 入力欄へ移るのも演出のあと。最中に移ると、スマホでキーボードが出てしまう
    introDone.then(function () {
      gate.classList.add('is-in');
      setTimeout(function () { try { gatePass.focus(); } catch (e) {} }, 50);
    });
  }

  function errorMessage(err) {
    var code = err && err.message;
    if (code === 'wrong-pass') { return '合言葉がちがいます'; }
    if (code === 'not-ready') { return 'ただいま準備中です\nもうしばらくお待ちください'; }
    if (code === 'unsupported') { return 'このブラウザでは開けません\nSafari か Chrome でお試しください'; }
    return 'うまく開けませんでした\nもう一度お試しください';
  }

  gateForm.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var pass = normalizePass(gatePass.value);
    if (!pass) { return; }
    gateBtn.disabled = true;
    gateBtn.textContent = '確認中…';
    gateErr.hidden = true;
    unseal(pass).then(function (cfg) {
      storeSet(pass);
      begin(cfg);
    }, function (err) {
      gateErr.textContent = errorMessage(err);
      gateErr.hidden = false;
      gatePass.select();
    }).then(function () {
      gateBtn.disabled = false;
      gateBtn.textContent = 'ひらく';
    });
  });

  relock.addEventListener('click', function () {
    storeDel();
    location.reload();
  });

  /* ---------- 写真の取得 ---------- */
  function fetchAlbum(id) {
    var url = new URL(config.endpoint);
    url.searchParams.set('action', 'gallery');
    url.searchParams.set('eventId', id);
    url.searchParams.set('eventCode', config.eventCodes[id]);
    return fetch(url.toString(), { cache: 'no-store' })
      .then(function (res) {
        if (!res.ok) { throw new Error('HTTP ' + res.status); }
        return res.json();
      })
      .then(function (json) {
        if (!json.ok) { throw new Error(json.error || 'gallery error'); }
        return (json.photos || []).map(function (p) {
          return {
            id: id + ':' + p.id,
            album: id,
            author: p.author || '',
            createdAt: p.createdAt || '',
            comment: p.comment || '',
            thumb: p.image,
            full: p.fullImage || p.image
          };
        });
      });
  }

  function demoPhotos() {
    var names = ['our-beginning', 'kiyomizu-enhanced', 'shrine-night', 'miyajima', 'london-street', 'river-day',
      'stained-glass', 'happy-wedding', 'restaurant', 'globe-night', 'victory-day', 'oasis-live', 'cinema-day'];
    return Promise.resolve(names.map(function (n, i) {
      var id = i < 5 ? 'kyoto' : 'wedding';
      var src = 'assets/photos/' + n + '.jpg';
      return {
        id: 'demo:' + n, album: id, author: ['たくろう', 'かずみ', '栗栖家'][i % 3],
        createdAt: new Date(Date.UTC(2026, 10, i < 5 ? 28 : 29, 1 + i, 7 * i)).toISOString(),
        comment: i % 3 ? '' : 'デモ表示のコメントです', thumb: src, full: src
      };
    }).filter(function (p) { return config.eventCodes[p.album]; }));
  }

  function loadAll() {
    if (demoMatch) { return demoPhotos(); }
    return Promise.all(albums.map(function (a) {
      return fetchAlbum(a.id).then(function (photos) { return { ok: true, photos: photos }; },
        function () { return { ok: false, photos: [] }; });
    })).then(function (results) {
      // 片方のアルバムだけ失敗したときは、取れた方だけで続ける
      if (results.every(function (r) { return !r.ok; })) { throw new Error('fetch-failed'); }
      var photos = [];
      results.forEach(function (r) { photos = photos.concat(r.photos); });
      return photos;
    });
  }

  function byTime(a, b) {
    var ta = Date.parse(a.createdAt), tb = Date.parse(b.createdAt);
    if (isNaN(ta)) { return 1; }
    if (isNaN(tb)) { return -1; }
    return ta - tb;
  }

  function refresh() {
    return loadAll().then(function (photos) {
      all = photos.filter(function (p) { return !broken[p.id]; }).sort(byTime);
      var sig = all.map(function (p) { return p.id + '|' + p.comment; }).join(',');
      if (sig === lastSig) { return; }   // 変わっていなければ描き直さない（スクロール位置や読み込み済みの画像を保つ）
      lastSig = sig;
      if (lbIndex >= 0) { pendingRender = true; } else { render(); }
    }, function () {
      if (!all.length) { setStatus('写真を読み込めませんでした\n時間をおいて自動でやり直します'); }
    });
  }

  /* ---------- 一覧 ---------- */
  function setStatus(text) {
    statusEl.textContent = text || '';
    statusEl.hidden = !text;
  }

  function albumById(id) { return ALBUMS.filter(function (a) { return a.id === id; })[0]; }

  function renderTabs() {
    // アルバムが1つ（新婦側）ならタブは出さない
    if (albums.length < 2) { tabsEl.hidden = true; return; }
    tabsEl.hidden = false;
    tabsEl.innerHTML = '';
    [{ id: 'all', name: 'すべて' }].concat(albums).forEach(function (a) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'mem-tab' + (a.id === filter ? ' is-active' : '');
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', a.id === filter ? 'true' : 'false');
      b.textContent = a.name;
      b.addEventListener('click', function () {
        if (filter === a.id) { return; }
        filter = a.id;
        renderTabs();
        render();
        var top = tabsEl.offsetTop;
        if (window.scrollY > top) { window.scrollTo(0, top); }
      });
      tabsEl.appendChild(b);
    });
  }

  function render() {
    pendingRender = false;
    gallery.innerHTML = '';
    visible = [];
    var shown = albums.filter(function (a) { return filter === 'all' || a.id === filter; });
    shown.forEach(function (a) {
      var photos = all.filter(function (p) { return p.album === a.id; });
      if (!photos.length && shown.length > 1) { return; }   // 「すべて」では空のアルバムは出さない
      var sec = document.createElement('section');
      sec.className = 'mem-sec';
      var head = document.createElement('div');
      head.className = 'mem-sec__head';
      // 招待状ページの見出しと同じ組み：大きな英字 ＋ 緑のラベル（日付と日本語名）
      head.innerHTML = '<h2 class="mem-display mem-sec__title"></h2>' +
        '<p class="mem-sec__sub"><span class="mem-label"></span><span class="mem-sec__count"></span></p>';
      head.children[0].textContent = a.en;
      head.children[1].children[0].textContent = a.date + ' ' + a.name;
      head.children[1].children[1].textContent = photos.length + '枚';
      sec.appendChild(head);
      if (!photos.length) {
        var empty = document.createElement('p');
        empty.className = 'mem-status';
        empty.textContent = 'まだ写真がありません';
        sec.appendChild(empty);
      } else {
        var grid = document.createElement('div');
        grid.className = 'mem-grid';
        photos.forEach(function (p) { grid.appendChild(thumb(p, visible.length)); visible.push(p); });
        sec.appendChild(grid);
      }
      gallery.appendChild(sec);
    });
    var total = visible.length;
    setStatus(!gallery.children.length ? 'まだ写真がありません' : '');
    totalEl.textContent = total ? '全 ' + total + ' 枚' : '';
  }

  function thumb(p, index) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'mem-thumb' + (p.comment ? ' has-comment' : '');
    b.setAttribute('aria-label', (p.author ? p.author + 'さんの写真' : '写真') + ' ' + formatTime(p.createdAt));
    var img = document.createElement('img');
    img.alt = '';
    img.loading = 'lazy';
    img.decoding = 'async';
    img.onload = function () { img.classList.add('is-loaded'); };
    img.onerror = function () {
      // Drive から消えた写真などは一覧から外す
      broken[p.id] = true;
      all = all.filter(function (x) { return x.id !== p.id; });
      var at = visible.indexOf(p);
      if (at >= 0) { visible.splice(at, 1); }
      b.remove();
    };
    img.src = p.thumb;
    b.appendChild(img);
    b.addEventListener('click', function () { openLightbox(visible.indexOf(p)); });
    return b;
  }

  /* ---------- 拡大表示 ---------- */
  var JST = { timeZone: 'Asia/Tokyo', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
  function formatTime(iso) {
    var d = new Date(iso);
    if (isNaN(d.getTime())) { return ''; }
    try {
      var parts = {};
      new Intl.DateTimeFormat('ja-JP', JST).formatToParts(d).forEach(function (x) { parts[x.type] = x.value; });
      return parts.month + '/' + parts.day + ' ' + parts.hour + ':' + parts.minute;
    } catch (e) { return ''; }
  }

  var lbToken = 0;
  function showInLightbox(i) {
    if (!visible.length) { return; }
    i = ((i % visible.length) + visible.length) % visible.length;
    lbIndex = i;
    var p = visible[i];
    var token = ++lbToken;
    // まず一覧で読み込み済みの小さい画像を出し、大きい画像が届いたら差し替える
    lbImg.src = p.thumb;
    if (p.full && p.full !== p.thumb) {
      var big = new Image();
      big.onload = function () { if (token === lbToken) { lbImg.src = p.full; } };
      big.src = p.full;
    }
    var a = albumById(p.album);
    lbAlbum.textContent = a ? a.name : '';
    lbAlbum.dataset.album = p.album;
    lbAlbum.hidden = albums.length < 2;
    lbAuthor.textContent = p.author ? 'by ' + p.author : '';
    lbTime.textContent = formatTime(p.createdAt);
    lbComment.textContent = p.comment;
    lbCount.textContent = (i + 1) + ' / ' + visible.length;
    var single = visible.length < 2;
    lbPrev.hidden = single;
    lbNext.hidden = single;
    // 次の写真を先に読んでおく
    var next = visible[(i + 1) % visible.length];
    if (next) { new Image().src = next.full; }
  }

  function openLightbox(i) {
    if (i < 0) { return; }
    showInLightbox(i);
    lb.hidden = false;
    document.body.classList.add('is-locked');
    // スマホの「戻る」で一覧に戻れるように履歴を1つ積む
    try { history.pushState({ memLb: true }, ''); } catch (e) {}
    setTimeout(function () { try { lbClose.focus(); } catch (e) {} }, 30);
  }

  function closeLightbox(fromPop) {
    if (lbIndex < 0) { return; }
    var p = visible[lbIndex];
    lbIndex = -1;
    lbToken++;
    lb.hidden = true;
    lbImg.removeAttribute('src');
    document.body.classList.remove('is-locked');
    if (!fromPop) { try { if (history.state && history.state.memLb) { history.back(); } } catch (e) {} }
    if (pendingRender) { render(); }
    // 見ていた写真の位置に一覧を合わせる
    var idx = visible.indexOf(p);
    var el = idx >= 0 ? gallery.querySelectorAll('.mem-thumb')[idx] : null;
    if (el) {
      var r = el.getBoundingClientRect();
      if (r.top < 60 || r.bottom > window.innerHeight) { el.scrollIntoView({ block: 'center' }); }
      try { el.focus({ preventScroll: true }); } catch (e) {}
    }
  }

  window.addEventListener('popstate', function () { if (lbIndex >= 0) { closeLightbox(true); } });
  lbClose.addEventListener('click', function () { closeLightbox(false); });
  lbPrev.addEventListener('click', function () { showInLightbox(lbIndex - 1); });
  lbNext.addEventListener('click', function () { showInLightbox(lbIndex + 1); });
  // 写真の外側（黒い所）をタップしたら閉じる
  lbStage.addEventListener('click', function (ev) { if (ev.target === lbStage && !swiped) { closeLightbox(false); } });

  var touchX = null, touchY = null, swiped = false;
  lbStage.addEventListener('touchstart', function (ev) {
    touchX = ev.touches[0].clientX; touchY = ev.touches[0].clientY; swiped = false;
  }, { passive: true });
  lbStage.addEventListener('touchend', function (ev) {
    if (touchX === null) { return; }
    var dx = ev.changedTouches[0].clientX - touchX;
    var dy = ev.changedTouches[0].clientY - touchY;
    touchX = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      swiped = true;
      showInLightbox(lbIndex + (dx < 0 ? 1 : -1));
    } else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) {
      swiped = true;
      closeLightbox(false);   // 下にスワイプで閉じる
    }
    if (swiped) { setTimeout(function () { swiped = false; }, 350); }
  });

  document.addEventListener('keydown', function (ev) {
    if (lbIndex < 0) { return; }
    if (ev.key === 'Escape') { closeLightbox(false); }
    else if (ev.key === 'ArrowRight') { showInLightbox(lbIndex + 1); }
    else if (ev.key === 'ArrowLeft') { showInLightbox(lbIndex - 1); }
  });

  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible' && config) { refresh(); }
  });

  /* ---------- はじまり ---------- */
  // オープニング演出（memories-intro.js）。裏で合言葉の確認と写真の読み込みを進めておく
  var introDone = window.MemIntro ? window.MemIntro.play() : Promise.resolve();

  function begin(cfg) {
    config = cfg;
    albums = ALBUMS.filter(function (a) { return cfg.eventCodes && cfg.eventCodes[a.id]; });
    filter = 'all';
    topDate.textContent = albums.length > 1 ? '2026.11.28 – 29 Kyoto' : '2026.11.29 Kyoto';
    gate.hidden = true;
    album.hidden = false;
    renderTabs();
    setStatus('写真を読み込んでいます…');
    refresh();
    setInterval(function () { if (document.visibilityState === 'visible') { refresh(); } }, REFRESH);
  }

  if (demoMatch) {
    var bride = demoMatch[1] === 'bride';
    begin({ side: bride ? 'bride' : 'groom', eventCodes: bride ? { wedding: 'x' } : { kyoto: 'x', wedding: 'x' } });
    return;
  }
  var saved = storeGet();
  if (saved) {
    unseal(saved).then(begin, function (err) {
      // 合言葉を変えたあとなどは、もう一度入れてもらう
      storeDel();
      openGate(err && err.message === 'wrong-pass' ? '' : errorMessage(err));
    });
  } else {
    openGate();
  }
})();
