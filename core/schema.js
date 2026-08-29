/* ===========================================================================
 * WEDI.schema — ブロック登録簿（フロントとエディターの「契約」/ Favori 構成）
 * 各タイプ: { label, icon, defaultData, fields, render(block,theme)[, hydrate] }
 * 依存: WEDI.render（esc / escMultiline / safeUrl / safeMapEmbed）
 * =========================================================================== */
(function (global) {
  'use strict';

  var WEDI = global.WEDI = global.WEDI || {};
  var R = WEDI.render;
  var esc = R.esc;
  var escM = R.escMultiline;
  var safeUrl = R.safeUrl;
  var safeMapEmbed = R.safeMapEmbed;

  function el(tag, className, html) {
    var e = document.createElement(tag);
    if (className) { e.className = className; }
    if (html != null) { e.innerHTML = html; }
    return e;
  }

  /* 共通の英＋日見出し（Message / ご挨拶） */
  function headHtml(d) {
    return '<div class="wb-head">' +
      (d.heading ? '<h2 class="wb-heading txt-serif">' + esc(d.heading) + '</h2>' : '') +
      (d.subheading ? '<p class="wb-subheading">' + esc(d.subheading) + '</p>' : '') +
    '</div>';
  }

  var types = {};

  /* ----------------------------------------------------------------- cover */
  types.cover = {
    label: 'カバー',
    icon: '🖼️',
    defaultData: {
      coverMode: 'classic',
      posterImage: '',
      image: '',
      letteringImage: '',                 // 手描き筆文字PNG（透過）。空ならテキストにフォールバック
      lettering: 'WEDDING\nINVITATION',
      names: 'SHUNPEI and KONOMI',
      date: '2026.11.29'
    },
    fields: [
      { key: 'coverMode', type: 'select', label: '表紙レイアウト', options: [
        { value: 'poster', label: '四隅文字＋中央写真' },
        { value: 'classic', label: '従来の写真＋筆文字' }
      ] },
      { key: 'posterImage', type: 'image', label: 'コラージュ表紙画像' },
      { key: 'image', type: 'image', label: '写真' },
      { key: 'letteringImage', type: 'image', label: '筆文字PNG（透過・任意）' },
      { key: 'lettering', type: 'textarea', label: '大きな英字（PNG未設定時の文字）' },
      { key: 'names', type: 'text', label: 'お名前（英字）' },
      { key: 'date', type: 'text', label: '日付' }
    ],
    render: function (block) {
      var d = block.data || {};
      var root = el('div', 'wb-cover');
      var migratedPoster = block.id === 'bk_cover' ? 'assets/cover-collage-v1.jpg' : '';
      var posterUrl = safeUrl(d.posterImage || migratedPoster);
      var coverMode = d.coverMode || (migratedPoster ? 'poster' : 'classic');
      if (coverMode === 'poster' && posterUrl) {
        root.classList.add('wb-cover--poster');
        root.innerHTML =
          '<figure class="wb-cover__poster">' +
            '<img src="' + esc(posterUrl) + '" alt="' + esc(d.lettering || 'WEDDING INVITATION') + '" fetchpriority="high">' +
          '</figure>' +
          '<div class="wb-cover__poster-meta">' +
            (d.names ? '<span class="txt-en">' + esc(d.names) + '</span>' : '') +
            (d.date ? '<span class="txt-en">' + esc(d.date) + '</span>' : '') +
          '</div>';
        return root;
      }
      var url = safeUrl(d.image);
      var letterUrl = safeUrl(d.letteringImage);
      // 筆文字: PNG があれば画像、無ければテキストにフォールバック
      var letteringHtml = letterUrl
        ? '<img class="wb-cover__lettering-img" src="' + esc(letterUrl) + '" alt="' +
            esc((d.lettering || 'WEDDING INVITATION').replace(/\n/g, ' ')) + '">'
        : '<h1 class="wb-cover__lettering txt-serif" aria-label="' +
            esc((d.lettering || '').replace(/\n/g, ' ')) + '">' + escM(d.lettering || '') + '</h1>';
      root.innerHTML =
        '<div class="wb-cover__lettering-wrap' + (letterUrl ? ' is-img' : '') + '">' + letteringHtml + '</div>' +
        '<div class="wb-cover__photo">' +
          (url ? '<img src="' + esc(url) + '" alt="">' : '<div class="wb-cover__ph">写真</div>') +
        '</div>' +
        '<p class="wb-cover__names txt-en">' + esc(d.names || '') + '</p>' +
        (d.date ? '<p class="wb-cover__date txt-en">' + esc(d.date) + '</p>' : '');
      return root;
    }
  };

  /* ------------------------------------------------------------- countdown */
  types.countdown = {
    label: 'カウントダウン',
    icon: '⏳',
    defaultData: {
      target: '2026-11-29T10:30:00+09:00',
      dateLabel: '2026.11.29'
    },
    fields: [
      { key: 'target', type: 'text', label: '挙式日時（例: 2026-11-29T10:30:00+09:00）' },
      { key: 'dateLabel', type: 'text', label: '表示する日付' }
    ],
    render: function (block) {
      var d = block.data || {};
      var root = el('div', 'wb-countdown');
      root.innerHTML =
        '<div class="wb-countdown__ring" data-target="' + esc(d.target || '') + '">' +
          '<span class="wb-countdown__arc wb-countdown__arc--top txt-en">Count down</span>' +
          '<div class="wb-countdown__days">' +
            '<span class="wb-countdown__num txt-serif" data-unit="days">―</span>' +
            '<span class="wb-countdown__dayslabel txt-en">days</span>' +
          '</div>' +
          '<div class="wb-countdown__hms">' +
            '<span><b class="txt-serif" data-unit="hours">―</b><i class="txt-en">hours</i></span>' +
            '<span><b class="txt-serif" data-unit="minutes">―</b><i class="txt-en">minutes</i></span>' +
            '<span><b class="txt-serif" data-unit="seconds">―</b><i class="txt-en">seconds</i></span>' +
          '</div>' +
          (d.dateLabel ? '<p class="wb-countdown__date txt-en">' + esc(d.dateLabel) + '</p>' : '') +
          '<span class="wb-countdown__arc wb-countdown__arc--bottom txt-en">to our wedding</span>' +
        '</div>';
      return root;
    },
    hydrate: function (root) {
      var ring = root.querySelector('.wb-countdown__ring');
      if (!ring || ring.dataset.bound === '1') { return; }
      ring.dataset.bound = '1';
      var target = new Date(ring.dataset.target || '');
      if (isNaN(target.getTime())) { return; }
      var units = {
        days: ring.querySelector('[data-unit="days"]'),
        hours: ring.querySelector('[data-unit="hours"]'),
        minutes: ring.querySelector('[data-unit="minutes"]'),
        seconds: ring.querySelector('[data-unit="seconds"]')
      };
      function pad(n) { return (n < 10 ? '0' : '') + n; }
      function tick() {
        var diff = Math.max(0, target.getTime() - Date.now());
        var s = Math.floor(diff / 1000);
        var days = Math.floor(s / 86400);
        var hours = Math.floor((s % 86400) / 3600);
        var mins = Math.floor((s % 3600) / 60);
        var secs = s % 60;
        if (units.days) { units.days.textContent = days; }
        if (units.hours) { units.hours.textContent = pad(hours); }
        if (units.minutes) { units.minutes.textContent = pad(mins); }
        if (units.seconds) { units.seconds.textContent = pad(secs); }
      }
      tick();
      ring._timer = setInterval(tick, 1000);
    }
  };

  /* --------------------------------------------------------------- message */
  types.message = {
    label: '挨拶・メッセージ',
    icon: '✍️',
    defaultData: {
      heading: 'Message',
      subheading: 'ご挨拶',
      body: '謹啓　皆様におかれましては\nご清栄のこととお慶び申し上げます\nこのたび私たちは結婚式を挙げることになりました\nつきましては日頃お世話になっている皆様に\n心ばかりの披露宴を催したく存じます',
      sign: '謹白',
      image: ''
    },
    fields: [
      { key: 'heading', type: 'text', label: '英字見出し' },
      { key: 'subheading', type: 'text', label: '見出し（日本語）' },
      { key: 'body', type: 'textarea', label: '本文' },
      { key: 'sign', type: 'text', label: '結び（謹白 など）' },
      { key: 'image', type: 'image', label: '写真（任意）' }
    ],
    render: function (block) {
      var d = block.data || {};
      var url = safeUrl(d.image);
      var root = el('div', 'wb-message');
      root.innerHTML =
        headHtml(d) +
        (d.body ? '<p class="wb-message__body">' + escM(d.body) + '</p>' : '') +
        (d.sign ? '<p class="wb-message__sign">' + esc(d.sign) + '</p>' : '') +
        (url ? '<div class="wb-message__photo"><img src="' + esc(url) + '" alt="" loading="lazy"></div>' : '');
      return root;
    }
  };

  /* --------------------------------------------------------------- profile */
  types.profile = {
    label: 'プロフィール',
    icon: '👰',
    defaultData: {
      heading: 'Profile',
      subheading: 'プロフィール',
      people: [
        { role: '新郎', name: '岩井 俊平', image: '', text: '皆様にお会いできることが今から楽しみです！\n美味しいお料理と飲み物をご用意してお待ちしています' },
        { role: '新婦', name: '福永 このみ', image: '', text: 'いつも支えてくれて本当にありがとうございます！\nこれからも夫婦共々よろしくお願いいたします' }
      ]
    },
    fields: [
      { key: 'heading', type: 'text', label: '英字見出し' },
      { key: 'subheading', type: 'text', label: '見出し' },
      { key: 'people', type: 'list', label: '人物', itemLabel: '人物', max: 2, itemFields: [
        { key: 'image', type: 'image', label: '写真' },
        { key: 'role', type: 'text', label: '続柄（新郎/新婦）' },
        { key: 'name', type: 'text', label: 'お名前' },
        { key: 'text', type: 'textarea', label: 'メッセージ' }
      ] }
    ],
    render: function (block) {
      var d = block.data || {};
      var root = el('div', 'wb-profile');
      var cards = (d.people || []).map(function (p) {
        var url = safeUrl(p.image);
        return '<div class="wb-profile__card">' +
          '<div class="wb-profile__photo">' +
            (url ? '<img src="' + esc(url) + '" alt="" loading="lazy">' : '<div class="wb-profile__ph">写真</div>') +
          '</div>' +
          (p.role ? '<p class="wb-profile__role">' + esc(p.role) + '</p>' : '') +
          '<h3 class="wb-profile__name txt-serif">' + esc(p.name || '') + '</h3>' +
          (p.text ? '<p class="wb-profile__text">' + escM(p.text) + '</p>' : '') +
        '</div>';
      }).join('');
      root.innerHTML = headHtml(d) + '<div class="wb-profile__list">' + cards + '</div>';
      return root;
    }
  };

  /* ----------------------------------------------------------------- album */
  types.album = {
    label: 'アルバム',
    icon: '📸',
    defaultData: {
      heading: 'Album',
      subheading: 'アルバム',
      autoplay: 'off',
      interval: '4',
      images: [
        { src: '', alt: '' }, { src: '', alt: '' }, { src: '', alt: '' }
      ]
    },
    fields: [
      { key: 'heading', type: 'text', label: '英字見出し' },
      { key: 'subheading', type: 'text', label: '見出し' },
      { key: 'autoplay', type: 'select', label: '自動スライド', options: [
        { value: 'on', label: 'オン' }, { value: 'off', label: 'オフ' }
      ] },
      { key: 'interval', type: 'select', label: '切り替え間隔', options: [
        { value: '3', label: '3秒' }, { value: '4', label: '4秒' },
        { value: '5', label: '5秒' }, { value: '6', label: '6秒' }
      ] },
      { key: 'images', type: 'list', label: '写真', itemLabel: '写真', max: 20, itemFields: [
        { key: 'src', type: 'image', label: '画像' },
        { key: 'alt', type: 'text', label: '代替テキスト(alt)' }
      ] }
    ],
    render: function (block) {
      var d = block.data || {};
      var root = el('div', 'wb-album');
      var imgs = (d.images || []).filter(function (it) { return safeUrl(it.src); });
      var slides = imgs.map(function (it, i) {
        return '<div class="wb-album__slide' + (i === 0 ? ' is-active' : '') + '" data-i="' + i + '">' +
          '<img class="wb-album__slide-bg" src="' + esc(safeUrl(it.src)) + '" alt="" aria-hidden="true" loading="lazy">' +
          '<img class="wb-album__slide-main" src="' + esc(safeUrl(it.src)) + '" alt="' + esc(it.alt || '') + '" loading="lazy"></div>';
      }).join('');
      var thumbs = imgs.map(function (it, i) {
        return '<button class="wb-album__thumb' + (i === 0 ? ' is-active' : '') + '" data-i="' + i + '" type="button">' +
          '<img src="' + esc(safeUrl(it.src)) + '" alt=""></button>';
      }).join('');
      root.innerHTML = headHtml(d) +
        (imgs.length
          ? '<div class="wb-album__stage" data-autoplay="' + esc(d.autoplay || 'off') + '" data-interval="' + esc(d.interval || '4') + '">' +
              '<button class="wb-album__nav wb-album__nav--prev" type="button" aria-label="前へ">‹</button>' +
              '<div class="wb-album__slides">' + slides + '</div>' +
              '<button class="wb-album__nav wb-album__nav--next" type="button" aria-label="次へ">›</button>' +
              '<span class="wb-album__count txt-en"><b data-album-current>01</b> / ' + String(imgs.length).padStart(2, '0') + '</span>' +
              '<span class="wb-album__progress" aria-hidden="true"></span>' +
            '</div>' +
            '<div class="wb-album__thumbs">' + thumbs + '</div>'
          : '<div class="wb-album__empty">写真を追加してください</div>');
      return root;
    },
    hydrate: function (root) {
      var stage = root.querySelector('.wb-album__stage');
      if (!stage || stage.dataset.bound === '1') { return; }
      stage.dataset.bound = '1';
      var slides = Array.prototype.slice.call(root.querySelectorAll('.wb-album__slide'));
      var thumbs = Array.prototype.slice.call(root.querySelectorAll('.wb-album__thumb'));
      var counter = root.querySelector('[data-album-current]');
      var autoplay = stage.dataset.autoplay === 'on';
      var interval = Math.max(3000, Math.min(6000, (parseInt(stage.dataset.interval, 10) || 4) * 1000));
      var timer = null;
      if (!slides.length) { return; }
      var cur = 0;
      function show(i) {
        cur = (i + slides.length) % slides.length;
        slides.forEach(function (s, k) { s.classList.toggle('is-active', k === cur); });
        thumbs.forEach(function (t, k) { t.classList.toggle('is-active', k === cur); });
        if (counter) { counter.textContent = String(cur + 1).padStart(2, '0'); }
        stage.classList.remove('is-cycling');
        void stage.offsetWidth;
        if (autoplay && timer) { stage.classList.add('is-cycling'); }
      }
      function stop() {
        if (timer) { global.clearInterval(timer); timer = null; }
        stage.classList.remove('is-cycling');
      }
      function start() {
        if (!autoplay || slides.length < 2 || timer ||
            (global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches)) { return; }
        timer = global.setInterval(function () {
          if (!stage.isConnected) { stop(); return; }
          show(cur + 1);
        }, interval);
        stage.style.setProperty('--album-interval', interval + 'ms');
        stage.classList.add('is-cycling');
      }
      function restart() {
        stop();
        start();
      }
      var prev = root.querySelector('.wb-album__nav--prev');
      var next = root.querySelector('.wb-album__nav--next');
      if (prev) { prev.addEventListener('click', function () { show(cur - 1); restart(); }); }
      if (next) { next.addEventListener('click', function () { show(cur + 1); restart(); }); }
      thumbs.forEach(function (t) {
        t.addEventListener('click', function () { show(parseInt(t.dataset.i, 10)); restart(); });
      });
      stage.addEventListener('mouseenter', stop);
      stage.addEventListener('mouseleave', start);
      stage.addEventListener('focusin', stop);
      stage.addEventListener('focusout', start);
      start();
    }
  };

  /* ----------------------------------------------------------- party-info */
  types.partyInfo = {
    label: 'パーティー情報',
    icon: '🗓️',
    defaultData: {
      heading: 'Party Information',
      subheading: 'パーティーのご案内',
      dateLabel: 'Date',
      dateText: '2026年11月29日 日曜日',
      sessions: [
        { name: '挙式', start: '10:30', sub1Label: '受付', sub1: '10:00', sub2Label: '終了予定', sub2: '11:00', note: '' },
        { name: '披露宴', start: '11:30', sub1Label: '受付', sub1: '11:00', sub2Label: 'お開き', sub2: '14:30', note: '' }
      ],
      venueLabel: '会場情報',
      venueName: 'アトールテラス鴨川',
      venueLines: '京都・鴨川沿い\n会場の詳細は別途ご案内します'
    },
    fields: [
      { key: 'heading', type: 'text', label: '英字見出し' },
      { key: 'subheading', type: 'text', label: '見出し' },
      { key: 'dateLabel', type: 'text', label: '日付ラベル' },
      { key: 'dateText', type: 'text', label: '日付' },
      { key: 'sessions', type: 'list', label: '式次第', itemLabel: '式', max: 4, itemFields: [
        { key: 'name', type: 'text', label: '名称（挙式 など）' },
        { key: 'start', type: 'text', label: '開始時刻' },
        { key: 'sub1Label', type: 'text', label: '補足1ラベル' },
        { key: 'sub1', type: 'text', label: '補足1' },
        { key: 'sub2Label', type: 'text', label: '補足2ラベル' },
        { key: 'sub2', type: 'text', label: '補足2' },
        { key: 'note', type: 'textarea', label: '注釈（小さく表示・省略可）' }
      ] },
      { key: 'venueLabel', type: 'text', label: '会場ラベル' },
      { key: 'venueName', type: 'text', label: '会場名' },
      { key: 'venueLines', type: 'textarea', label: '会場の住所・TEL（改行可）' }
    ],
    render: function (block) {
      var d = block.data || {};
      var root = el('div', 'wb-party');
      var sessions = (d.sessions || []).map(function (s) {
        var sub = (s.sub1Label || s.sub1 ? esc(s.sub1Label || '') + ' ' + esc(s.sub1 || '') : '') +
          (s.sub2Label || s.sub2 ? '　/　' + esc(s.sub2Label || '') + ' ' + esc(s.sub2 || '') : '');
        return '<div class="wb-party__card">' +
          '<p class="wb-party__name txt-serif"><span class="wb-rule"></span>' + esc(s.name || '') + '<span class="wb-rule"></span></p>' +
          '<p class="wb-party__start">開始時刻 <b class="txt-serif">' + esc(s.start || '') + '</b></p>' +
          (sub ? '<p class="wb-party__sub">' + sub + '</p>' : '') +
          (s.note ? '<p class="wb-party__note">' + escM(s.note) + '</p>' : '') +
        '</div>';
      }).join('');
      root.innerHTML =
        headHtml(d) +
        '<div class="wb-party__date">' +
          (d.dateLabel ? '<p class="wb-party__datelabel txt-en">' + esc(d.dateLabel) + '</p>' : '') +
          (d.dateText ? '<p class="wb-party__datetext txt-serif">' + esc(d.dateText) + '</p>' : '') +
        '</div>' +
        sessions +
        '<div class="wb-party__venue">' +
          (d.venueLabel ? '<p class="wb-party__name txt-serif"><span class="wb-rule wb-rule--ink"></span>' + esc(d.venueLabel) + '<span class="wb-rule wb-rule--ink"></span></p>' : '') +
          (d.venueName ? '<p class="wb-party__venuename txt-serif">' + esc(d.venueName) + '</p>' : '') +
          (d.venueLines ? '<p class="wb-party__venuelines">' + escM(d.venueLines) + '</p>' : '') +
        '</div>';
      return root;
    }
  };

  /* --------------------------------------------------------------- request */
  types.request = {
    label: 'その他のご案内',
    icon: '📨',
    defaultData: {
      heading: 'Request',
      subheading: 'その他のご案内',
      cardTitle: '挙式参列のお願い',
      cardBody: '誠に恐れ入りますが\n挙式にもご列席賜りたく\n当日は10時00分までに\nご光来のほど\nよろしくお願い申し上げます'
    },
    fields: [
      { key: 'heading', type: 'text', label: '英字見出し' },
      { key: 'subheading', type: 'text', label: '見出し' },
      { key: 'cardTitle', type: 'text', label: 'カード見出し' },
      { key: 'cardBody', type: 'textarea', label: 'カード本文' }
    ],
    render: function (block) {
      var d = block.data || {};
      var root = el('div', 'wb-request');
      root.innerHTML =
        headHtml(d) +
        '<div class="wb-request__card">' +
          (d.cardTitle ? '<h3 class="wb-request__title">' + esc(d.cardTitle) + '</h3>' : '') +
          (d.cardBody ? '<p class="wb-request__body">' + escM(d.cardBody) + '</p>' : '') +
        '</div>';
      return root;
    }
  };

  /* ------------------------------------------------------------------ rsvp */
  /* ご出欠ブロック（挙式/披露宴 × Attend/Decline/Hold）＋ 詳細フォーム */
  function attendGroup(name, label) {
    var opts = [
      { v: '出席', en: 'Attend', ja: 'ご出席' },
      { v: '欠席', en: 'Decline', ja: 'ご欠席' },
      { v: '保留', en: 'Hold', ja: '保留' }
    ];
    var cells = opts.map(function (o) {
      return '<label class="wb-attend__opt">' +
        '<input type="radio" name="' + esc(name) + '" value="' + esc(o.v) + '">' +
        '<span class="wb-attend__en txt-serif">' + o.en + '</span>' +
        '<span class="wb-attend__ja">' + o.ja + '</span>' +
      '</label>';
    }).join('');
    return '<fieldset class="wb-attend">' +
      '<legend class="wb-attend__legend txt-serif"><span class="wb-rule wb-rule--ink"></span>' + esc(label) + '<span class="wb-rule wb-rule--ink"></span></legend>' +
      '<div class="wb-attend__row">' + cells + '</div>' +
    '</fieldset>';
  }

  types.rsvp = {
    label: '出欠フォーム',
    icon: '✉️',
    defaultData: {
      heading: 'RSVP',
      subheading: '返信フォーム',
      lead: '御出欠について',
      deadline: '2026年11月1日 (日)',
      deadlineNote: '万が一ご都合が合わなくなってしまった場合は\n直接ご連絡ください',
      askCeremony: true,
      askReception: true,
      busInfo: '京都駅からタクシーを手配いたします\nタクシーチケットをお渡ししますので\nご利用を希望される方は「利用する」にチェックをお願いいたします',
      askCompanions: true,
      maxCompanions: 5,
      submitLabel: '確認画面へ',
      endpoint: ''
    },
    fields: [
      { key: 'heading', type: 'text', label: '英字見出し' },
      { key: 'subheading', type: 'text', label: '見出し' },
      { key: 'lead', type: 'text', label: 'リード文' },
      { key: 'deadline', type: 'text', label: '回答期限' },
      { key: 'deadlineNote', type: 'textarea', label: '期限の注記' },
      { key: 'askCeremony', type: 'select', label: '挙式の出欠を聞く', options: [
        { value: true, label: '聞く' }, { value: false, label: '聞かない' } ] },
      { key: 'askReception', type: 'select', label: '披露宴の出欠を聞く', options: [
        { value: true, label: '聞く' }, { value: false, label: '聞かない' } ] },
      { key: 'askCompanions', type: 'select', label: '同席者を聞く', options: [
        { value: true, label: '聞く' }, { value: false, label: '聞かない' } ] },
      { key: 'maxCompanions', type: 'select', label: '同席者の最大人数', options: [
        { value: 3, label: '3名まで' }, { value: 5, label: '5名まで' },
        { value: 8, label: '8名まで' }, { value: 10, label: '10名まで' } ] },
      { key: 'busInfo', type: 'textarea', label: 'タクシー案内（空なら非表示）' },
      { key: 'submitLabel', type: 'text', label: '送信ボタン文言' },
      { key: 'endpoint', type: 'text', label: '送信先URL（GAS）' }
    ],
    render: function (block) {
      var d = block.data || {};
      var root = el('div', 'wb-rsvp');
      function f(label, name, opts) {
        opts = opts || {};
        var req = opts.required ? ' <i class="wb-req">*</i>' : '';
        var ph = opts.ph ? ' placeholder="' + esc(opts.ph) + '"' : '';
        var input = opts.type === 'textarea'
          ? '<textarea name="' + esc(name) + '" rows="3"' + ph + '></textarea>'
          : '<input type="' + (opts.type || 'text') + '" name="' + esc(name) + '"' + ph +
            (opts.required ? ' required' : '') + '>';
        return '<div class="wb-rsvp__field"><label>' + esc(label) + req + '</label>' + input + '</div>';
      }
      function twin(label, name, ph1, ph2, req) {
        return '<div class="wb-rsvp__field"><label>' + esc(label) + (req ? ' <i class="wb-req">*</i>' : '') + '</label>' +
          '<div class="wb-rsvp__twin">' +
            '<input type="text" name="' + esc(name) + '1" placeholder="' + esc(ph1) + '"' + (req ? ' required' : '') + '>' +
            '<input type="text" name="' + esc(name) + '2" placeholder="' + esc(ph2) + '"' + (req ? ' required' : '') + '>' +
          '</div></div>';
      }

      var bus = (d.busInfo || '').trim()
        ? '<div class="wb-rsvp__field"><label>京都駅からのタクシー</label>' +
            '<p class="wb-rsvp__busnote">' + escM(d.busInfo) + '</p>' +
            '<label class="wb-radio"><input type="radio" name="bus" value="利用する"> 利用する</label>' +
            '<label class="wb-radio"><input type="radio" name="bus" value="利用しない"> 利用しない</label>' +
          '</div>'
        : '';

      // 同席者: 人数 select → 選んだ数だけ名前欄が出る（hydrate で動的生成）
      var maxC = parseInt(d.maxCompanions, 10) || 5;
      var countOpts = '<option value="0">いない（自分のみ）</option>';
      for (var ci = 1; ci <= maxC; ci++) {
        countOpts += '<option value="' + ci + '">' + ci + '名</option>';
      }
      // 既定で表示（明示的に false のときだけ隠す）。古い保存データでも出るように。
      var companions = (d.askCompanions !== false)
        ? '<div class="wb-rsvp__field wb-rsvp__companions">' +
            '<label>同席者（ご家族など）</label>' +
            '<p class="wb-rsvp__hintnote">同席される方がいる場合は人数を選びお名前をご記入ください</p>' +
            '<select name="companion_count" class="wb-rsvp__select">' + countOpts + '</select>' +
            '<div class="wb-rsvp__companion-list" data-companion-list></div>' +
          '</div>'
        : '';

      root.innerHTML =
        headHtml({ heading: d.heading, subheading: d.subheading }) +
        '<div class="wb-rsvp__intro">' +
          (d.lead ? '<p class="wb-rsvp__lead txt-serif">' + esc(d.lead) + '</p>' : '') +
          (d.deadline ? '<p class="wb-rsvp__deadline">誠に勝手ながら <u>' + esc(d.deadline) + '</u> 迄に<br>ご回答いただければ幸いに存じます</p>' : '') +
          (d.deadlineNote ? '<div class="wb-rsvp__note">' + escM(d.deadlineNote) + '</div>' : '') +
        '</div>' +
        '<form class="wb-rsvp__form" novalidate>' +
          ((d.askCeremony || d.askReception) ? attendGroup('attend', '結婚式') : '') +
          '<p class="wb-rsvp__hint"><i class="wb-req">*</i> は必須項目です</p>' +
          '<div class="wb-rsvp__field"><label>いずれかをお選びください <i class="wb-req">*</i></label>' +
            '<div class="wb-rsvp__twin">' +
              '<label class="wb-pickbtn"><input type="radio" name="guest_side" value="新郎ゲスト"><span>新郎ゲスト</span></label>' +
              '<label class="wb-pickbtn"><input type="radio" name="guest_side" value="新婦ゲスト"><span>新婦ゲスト</span></label>' +
            '</div></div>' +
          twin('お名前', 'name', '姓', '名', true) +
          twin('お名前（ローマ字）', 'name_roma', 'Sei', 'Mei', false) +
          f('間柄', 'relation', { ph: '例：兄 / 叔母 など' }) +
          f('郵便番号', 'zip', { ph: '100-0000' }) +
          f('都道府県 市区町村', 'address1', { ph: '東京都新宿区新宿' }) +
          f('丁目 番地', 'address2', { ph: '1-36-2' }) +
          f('建物名 部屋番号など', 'address3', { ph: '新宿第七葉山ビル 301' }) +
          f('電話番号（半角数字 ハイフン）', 'tel', { ph: '090-1234-5678' }) +
          f('メールアドレス', 'email', { type: 'email', ph: 'sample@example.com', required: true }) +
          '<div class="wb-rsvp__field"><label>アレルギーについて</label>' +
            '<label class="wb-radio"><input type="radio" name="allergy" value="なし" checked> アレルギーなし</label>' +
            '<label class="wb-radio"><input type="radio" name="allergy" value="あり"> アレルギーあり</label>' +
            '<input type="text" name="allergy_detail" placeholder="アレルギー内容" class="wb-rsvp__allergydetail">' +
          '</div>' +
          companions +
          f('ひとことメッセージ', 'message', { type: 'textarea' }) +
          '<div class="wb-rsvp__field wb-rsvp__field--photo">' +
            '<label>プロフィール写真</label>' +
            '<p class="wb-rsvp__hintnote">よろしければプロフィール写真の添付をお願いいたします</p>' +
            '<input type="file" name="profile_photo" accept="image/*" class="wb-rsvp__fileupload">' +
            '<div class="wb-rsvp__photo-preview"></div>' +
          '</div>' +
          bus +
          '<button type="submit" class="wb-pill">' + esc(d.submitLabel || '確認画面へ') + '</button>' +
          '<p class="wb-rsvp__status" aria-live="polite"></p>' +
        '</form>';
      return root;
    },
    hydrate: function (root, block) {
      var d = block.data || {};
      var form = root.querySelector('.wb-rsvp__form');
      if (!form || form.dataset.bound === '1') { return; }
      form.dataset.bound = '1';
      var status = form.querySelector('.wb-rsvp__status');
      var endpoint = safeUrl(d.endpoint);

      // --- 同席者: 人数選択で名前欄を動的生成 ---
      var countSel = form.querySelector('[name="companion_count"]');
      var compList = form.querySelector('[data-companion-list]');
      if (countSel && compList) {
        countSel.addEventListener('change', function () {
          var n = parseInt(countSel.value, 10) || 0;
          var existing = compList.querySelectorAll('.wb-rsvp__companion-block').length;
          if (n < existing) {
            var blocks = compList.querySelectorAll('.wb-rsvp__companion-block');
            for (var r = existing - 1; r >= n; r--) { blocks[r].remove(); }
          } else {
            for (var i = existing; i < n; i++) {
              var cblock = document.createElement('div');
              cblock.className = 'wb-rsvp__companion-block';
              cblock.innerHTML =
                '<p class="wb-rsvp__companion-label">同席者 ' + (i + 1) + '</p>' +
                '<div class="wb-rsvp__companion-row">' +
                  '<input type="text" name="companion_' + (i + 1) + '_name" placeholder="お名前">' +
                  '<select name="companion_' + (i + 1) + '_attend">' +
                    '<option value="出席">出席</option>' +
                    '<option value="欠席">欠席</option>' +
                  '</select>' +
                '</div>' +
                '<div class="wb-rsvp__companion-allergy">' +
                  '<label class="wb-radio"><input type="radio" name="companion_' + (i + 1) + '_allergy" value="なし" checked> アレルギーなし</label>' +
                  '<label class="wb-radio"><input type="radio" name="companion_' + (i + 1) + '_allergy" value="あり"> アレルギーあり</label>' +
                  '<input type="text" name="companion_' + (i + 1) + '_allergy_detail" placeholder="アレルギー内容" class="wb-rsvp__allergydetail wb-rsvp__companion-allergydetail">' +
                '</div>' +
                '<div class="wb-rsvp__companion-photo">' +
                  '<label class="wb-rsvp__companion-photolabel">プロフィール写真（任意）</label>' +
                  '<input type="file" name="companion_' + (i + 1) + '_photo" accept="image/*" class="wb-rsvp__fileupload wb-rsvp__companion-fileupload">' +
                  '<div class="wb-rsvp__photo-preview wb-rsvp__companion-photo-preview"></div>' +
                '</div>';
              (function (cb) {
                var detail = cb.querySelector('.wb-rsvp__companion-allergydetail');
                detail.style.display = 'none';
                cb.querySelectorAll('input[type="radio"]').forEach(function (radio) {
                  radio.addEventListener('change', function () {
                    detail.style.display = (radio.value === 'あり' && radio.checked) ? '' : 'none';
                  });
                });
                // 同席者写真のプレビュー
                var cPhoto = cb.querySelector('.wb-rsvp__companion-fileupload');
                var cPrev = cb.querySelector('.wb-rsvp__companion-photo-preview');
                if (cPhoto && cPrev) {
                  cPhoto.addEventListener('change', function () {
                    var f = cPhoto.files[0];
                    if (!f) { cPrev.innerHTML = ''; return; }
                    var rd = new FileReader();
                    rd.onload = function (ev2) { cPrev.innerHTML = '<img src="' + ev2.target.result + '" alt="プレビュー">'; };
                    rd.readAsDataURL(f);
                  });
                }
              })(cblock);
              compList.appendChild(cblock);
            }
          }
        });
      }

      // --- 郵便番号→住所自動入力（zipcloud） ---
      var zipInput = form.querySelector('[name="zip"]');
      if (zipInput) {
        zipInput.addEventListener('blur', function () {
          var z = zipInput.value.replace(/[^0-9]/g, '');
          if (z.length !== 7) { return; }
          var url = 'https://zipcloud.ibsnet.co.jp/api/search?zipcode=' + z;
          fetch(url).then(function (r) { return r.json(); }).then(function (data) {
            if (!data.results || !data.results[0]) { return; }
            var r = data.results[0];
            var a1 = form.querySelector('[name="address1"]');
            var a2 = form.querySelector('[name="address2"]');
            if (a1) { a1.value = (r.address1 || '') + (r.address2 || '') + (r.address3 || ''); }
            if (a2) { a2.value = ''; a2.focus(); }
          }).catch(function () {});
        });
      }

      // --- アレルギー「あり」のときだけ詳細欄を表示 ---
      var allergyDetail = form.querySelector('.wb-rsvp__allergydetail');
      if (allergyDetail) {
        allergyDetail.style.display = 'none';
        form.querySelectorAll('input[name="allergy"]').forEach(function (radio) {
          radio.addEventListener('change', function () {
            allergyDetail.style.display = (radio.value === 'あり' && radio.checked) ? '' : 'none';
          });
        });
      }

      // --- プロフィール写真: プレビュー表示 ---
      var photoInput = form.querySelector('.wb-rsvp__fileupload');
      var photoPreview = form.querySelector('.wb-rsvp__photo-preview');
      if (photoInput && photoPreview) {
        photoInput.addEventListener('change', function () {
          var file = photoInput.files[0];
          if (!file) { photoPreview.innerHTML = ''; return; }
          var reader = new FileReader();
          reader.onload = function (e) {
            photoPreview.innerHTML = '<img src="' + e.target.result + '" alt="プレビュー">';
          };
          reader.readAsDataURL(file);
        });
      }

      form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        if (!endpoint) {
          if (status) { status.textContent = '※ プレビューのため入力内容の送信はできません'; }
          return;
        }

        // --- バリデーション ---
        // 既存のエラー表示をリセット
        form.querySelectorAll('.wb-rsvp__field-error').forEach(function (el) { el.remove(); });
        form.querySelectorAll('.wb-rsvp__field--error').forEach(function (el) { el.classList.remove('wb-rsvp__field--error'); });
        var errors = [];
        function fieldError(inputEl, msg) {
          var field = inputEl.closest('.wb-rsvp__field') || inputEl.parentElement;
          field.classList.add('wb-rsvp__field--error');
          var errEl = document.createElement('p');
          errEl.className = 'wb-rsvp__field-error';
          errEl.textContent = msg;
          field.appendChild(errEl);
          errors.push(inputEl);
        }
        // メールアドレス（必須）
        var emailEl = form.querySelector('[name="email"]');
        if (emailEl && !emailEl.value.trim()) { fieldError(emailEl, 'メールアドレスを入力してください'); }
        // 名前（必須）
        var name1El = form.querySelector('[name="name1"]');
        var name2El = form.querySelector('[name="name2"]');
        if (name1El && !name1El.value.trim()) { fieldError(name1El, '姓を入力してください'); }
        if (name2El && !name2El.value.trim()) { fieldError(name2El, '名を入力してください'); }
        // ゲスト区分（必須ラジオ）
        var guestSideChecked = form.querySelector('input[name="guest_side"]:checked');
        if (!guestSideChecked) {
          var guestField = form.querySelector('input[name="guest_side"]');
          if (guestField) { fieldError(guestField, '新郎ゲスト / 新婦ゲストをお選びください'); }
        }
        if (errors.length) {
          errors[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
          if (status) { status.textContent = '未入力の項目があります。ご確認ください。'; }
          return;
        }

        if (status) { status.textContent = '回答を送信中です。しばらくお待ちください'; }

        var fd = new FormData(form);
        var payload = {};
        fd.forEach(function (v, k) {
          if (v instanceof File) { return; } // ファイルは別処理
          payload[k] = v;
        });

        // プロフィール写真（本人＋同席者）をアップロードしてからGAS送信
        function sendToGas() {
          var frameName = 'wedi-rsvp-' + block.id;
          var iframe = document.createElement('iframe');
          iframe.name = frameName; iframe.style.display = 'none';
          document.body.appendChild(iframe);
          var poster = document.createElement('form');
          poster.action = endpoint; poster.method = 'POST'; poster.target = frameName; poster.style.display = 'none';
          Object.keys(payload).forEach(function (k) {
            var input = document.createElement('input');
            input.type = 'hidden'; input.name = k; input.value = payload[k];
            poster.appendChild(input);
          });
          document.body.appendChild(poster);
          iframe.addEventListener('load', function () {
            if (status) { status.textContent = 'ご回答ありがとうございました。'; }
            form.reset();
            if (photoPreview) { photoPreview.innerHTML = ''; }
            setTimeout(function () { poster.remove(); iframe.remove(); }, 0);
          });
          poster.submit();
        }

        /* --- プロフィール写真: 縮小して base64 で同送する ---
         * 受け取った GAS 側が Google ドライブに保存し、URLをシートに書く。
         * スマホの写真は数MBあるので、送信前に長辺1600pxのJPEGへ落とす。 */
        var MAX_PX = 1280;
        var JPEG_QUALITY = 0.8;

        function toResizedDataUrl(file) {
          return new Promise(function (resolve) {
            if (!file || !/^image\//.test(file.type)) { resolve(null); return; }
            var reader = new FileReader();
            reader.onerror = function () { resolve(null); };
            reader.onload = function (ev) {
              var img = new Image();
              img.onerror = function () { resolve(null); };
              img.onload = function () {
                try {
                  var w = img.naturalWidth, h = img.naturalHeight;
                  var scale = Math.min(1, MAX_PX / Math.max(w, h));
                  var cw = Math.max(1, Math.round(w * scale));
                  var ch = Math.max(1, Math.round(h * scale));
                  var canvas = document.createElement('canvas');
                  canvas.width = cw; canvas.height = ch;
                  canvas.getContext('2d').drawImage(img, 0, 0, cw, ch);
                  resolve(canvas.toDataURL('image/jpeg', JPEG_QUALITY));
                } catch (err) { resolve(null); }
              };
              img.src = ev.target.result;
            };
            reader.readAsDataURL(file);
          });
        }

        var photoJobs = [];
        function queuePhoto(file, keyPrefix) {
          if (!file) { return; }
          photoJobs.push(toResizedDataUrl(file).then(function (dataUrl) {
            if (dataUrl) {
              payload[keyPrefix + '_b64'] = dataUrl;
              payload[keyPrefix + '_name'] = file.name || '';
            }
          }));
        }

        queuePhoto(photoInput && photoInput.files[0], 'profile_photo');
        var compCount = parseInt(payload.companion_count, 10) || 0;
        for (var ui = 1; ui <= compCount; ui++) {
          var cInput = form.querySelector('[name="companion_' + ui + '_photo"]');
          queuePhoto(cInput && cInput.files[0], 'companion_' + ui + '_photo');
        }

        if (photoJobs.length) {
          if (status) { status.textContent = '回答を送信中です。しばらくお待ちください'; }
          Promise.all(photoJobs).then(sendToGas, sendToGas);
        } else {
          sendToGas();
        }
      });
    }
  };

  /* ------------------------------------------------ 旅のしおり用 汎用ブロック */
  types.schedule = {
    label: 'スケジュール',
    icon: '📋',
    defaultData: {
      heading: 'Schedule', subheading: '当日の流れ',
      items: [ { time: '10:00', title: '受付開始', text: '' }, { time: '10:30', title: '挙式', text: '' } ]
    },
    fields: [
      { key: 'heading', type: 'text', label: '英字見出し' },
      { key: 'subheading', type: 'text', label: '見出し' },
      { key: 'items', type: 'list', label: '予定', itemLabel: '予定', max: 12, itemFields: [
        { key: 'time', type: 'text', label: '時間', placeholder: '10:30' },
        { key: 'title', type: 'text', label: 'タイトル' },
        { key: 'text', type: 'textarea', label: '内容' }
      ] }
    ],
    render: function (block) {
      var d = block.data || {};
      var root = el('div', 'wb-schedule');
      var rows = (d.items || []).map(function (it) {
        return '<li class="wb-schedule__row">' +
          '<span class="wb-schedule__time txt-serif">' + esc(it.time || '') + '</span>' +
          '<div class="wb-schedule__body"><h3 class="wb-schedule__title">' + esc(it.title || '') + '</h3>' +
          (it.text ? '<p class="wb-schedule__text">' + escM(it.text) + '</p>' : '') + '</div></li>';
      }).join('');
      root.innerHTML = headHtml(d) + '<ul class="wb-schedule__list">' + rows + '</ul>';
      return root;
    }
  };

  types.map = {
    label: '地図',
    icon: '📍',
    defaultData: { heading: 'Access', subheading: '会場へのアクセス', embed: '', caption: '地図をタップで拡大・操作できます。' },
    fields: [
      { key: 'heading', type: 'text', label: '英字見出し' },
      { key: 'subheading', type: 'text', label: '見出し' },
      { key: 'embed', type: 'text', label: 'Googleマップ埋め込みURL' },
      { key: 'caption', type: 'text', label: 'キャプション' }
    ],
    render: function (block) {
      var d = block.data || {};
      var root = el('div', 'wb-map');
      var src = safeMapEmbed(d.embed);
      root.innerHTML = headHtml(d) +
        (src ? '<div class="wb-map__frame"><iframe src="' + esc(src) + '" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div>'
             : '<div class="wb-map__empty">GoogleマップのURLを入れてください</div>') +
        (d.caption ? '<p class="wb-map__cap">' + esc(d.caption) + '</p>' : '');
      return root;
    }
  };

  types.photo = {
    label: '写真',
    icon: '📷',
    defaultData: { layout: 'gallery', images: [ { src: '', caption: '', alt: '' } ] },
    fields: [
      { key: 'layout', type: 'select', label: 'レイアウト', options: [
        { value: 'single', label: '1枚' }, { value: 'gallery', label: 'ギャラリー' } ] },
      { key: 'images', type: 'list', label: '写真', itemLabel: '写真', max: 20, itemFields: [
        { key: 'src', type: 'image', label: '画像' },
        { key: 'caption', type: 'text', label: 'キャプション' },
        { key: 'alt', type: 'text', label: '代替テキスト(alt)' }
      ] }
    ],
    render: function (block) {
      var d = block.data || {};
      var root = el('div', 'wb-photo wb-photo--' + (d.layout || 'gallery'));
      var imgs = (d.images || []).filter(function (it) { return safeUrl(it.src); });
      if (!imgs.length) { root.appendChild(el('div', 'wb-photo__empty', '写真を追加してください')); return root; }
      var grid = el('div', 'wb-photo__grid');
      imgs.forEach(function (it) {
        var fig = el('figure', 'wb-photo__item');
        fig.innerHTML = '<img src="' + esc(safeUrl(it.src)) + '" alt="' + esc(it.alt || '') + '" loading="lazy">' +
          (it.caption ? '<figcaption class="wb-photo__cap txt-en">' + esc(it.caption) + '</figcaption>' : '');
        grid.appendChild(fig);
      });
      root.appendChild(grid);
      return root;
    }
  };

  types.text = {
    label: 'テキスト',
    icon: '📝',
    defaultData: { body: 'ここに文章を入力します。' },
    fields: [ { key: 'body', type: 'textarea', label: '本文' } ],
    render: function (block) {
      var d = block.data || {};
      var root = el('div', 'wb-text');
      root.innerHTML = '<p class="wb-text__body">' + escM(d.body || '') + '</p>';
      return root;
    }
  };

  types.image = {
    label: '画像（1枚）',
    icon: '🏞️',
    defaultData: { src: '', caption: '', alt: '' },
    fields: [
      { key: 'src', type: 'image', label: '画像' },
      { key: 'caption', type: 'text', label: 'キャプション' },
      { key: 'alt', type: 'text', label: '代替テキスト(alt)' }
    ],
    render: function (block) {
      var d = block.data || {};
      var root = el('div', 'wb-image');
      var url = safeUrl(d.src);
      if (!url) { root.appendChild(el('div', 'wb-image__empty', '画像を追加してください')); return root; }
      root.innerHTML = '<figure class="wb-image__fig"><img src="' + esc(url) + '" alt="' + esc(d.alt || '') + '" loading="lazy">' +
        (d.caption ? '<figcaption class="wb-image__cap txt-en">' + esc(d.caption) + '</figcaption>' : '') + '</figure>';
      return root;
    }
  };

  /* -------------------------------------------------------------- photoCta */
  /* 「写真を送る」CTA。ゲストが Google フォームへ飛んで写真投稿。 */
  types.photoCta = {
    label: '写真を送るボタン',
    icon: '📤',
    defaultData: {
      title: 'みんなの写真をシェア',
      text: '当日の写真や、ふたりとの思い出の一枚をぜひお寄せください。',
      buttonLabel: '写真を送る',
      url: ''
    },
    fields: [
      { key: 'title', type: 'text', label: '見出し' },
      { key: 'text', type: 'textarea', label: '説明文' },
      { key: 'buttonLabel', type: 'text', label: 'ボタン文言' },
      { key: 'url', type: 'text', label: 'GoogleフォームのURL' }
    ],
    render: function (block) {
      var d = block.data || {};
      var root = el('div', 'wb-photocta');
      var url = safeUrl(d.url);
      root.innerHTML =
        (d.title ? '<h3 class="wb-photocta__title txt-serif">' + esc(d.title) + '</h3>' : '') +
        (d.text ? '<p class="wb-photocta__text">' + escM(d.text) + '</p>' : '') +
        (url
          ? '<a class="wb-pill" href="' + esc(url) + '" target="_blank" rel="noopener">' +
              esc(d.buttonLabel || '写真を送る') + '</a>'
          : '<span class="wb-pill wb-pill--disabled">' + esc(d.buttonLabel || '写真を送る') + '</span>' +
            '<p class="wb-photocta__note">GoogleフォームのURLを設定してください</p>');
      return root;
    }
  };

  /* ----------------------------------------------------------------- embed */
  /* HTML/埋め込みコードを「サンドボックス iframe」で安全に表示。
   * srcdoc に貼り付けコードを入れ、sandbox で親ページから隔離（allow-same-origin は付けない）。 */
  types.embed = {
    label: 'HTML / 埋め込み',
    icon: '🔗',
    defaultData: {
      heading: '',
      subheading: '',
      code: '<!-- ここに埋め込みコード（YouTube / Instagram / Googleマップ 等）を貼り付け -->',
      height: '400'
    },
    fields: [
      { key: 'heading', type: 'text', label: '英字見出し（任意）' },
      { key: 'subheading', type: 'text', label: '見出し（任意）' },
      { key: 'code', type: 'textarea', label: '埋め込みコード / HTML' },
      { key: 'height', type: 'select', label: '高さ', options: [
        { value: '240', label: '低い' }, { value: '400', label: '標準' },
        { value: '560', label: '高い' }, { value: '720', label: 'とても高い' } ] }
    ],
    render: function (block) {
      var d = block.data || {};
      var root = el('div', 'wb-embed');
      var code = (d.code || '').trim();
      var h = parseInt(d.height, 10) || 400;
      var head = (d.heading || d.subheading) ? headHtml(d) : '';
      if (!code) {
        root.innerHTML = head + '<div class="wb-embed__empty">埋め込みコードを入力してください</div>';
        return root;
      }
      // srcdoc 用にレスポンシブな土台を付けた HTML 文書を組む
      var docHtml =
        '<!DOCTYPE html><html><head><meta charset="utf-8">' +
        '<meta name="viewport" content="width=device-width,initial-scale=1">' +
        '<base target="_blank">' +
        '<style>html,body{margin:0;padding:0;font-family:sans-serif}' +
        'img,iframe,video{max-width:100%;border:0}*{box-sizing:border-box}</style>' +
        '</head><body>' + code + '</body></html>';
      var iframe = document.createElement('iframe');
      iframe.className = 'wb-embed__frame';
      iframe.style.height = h + 'px';
      iframe.setAttribute('loading', 'lazy');
      // 親ページから隔離（allow-same-origin は付けない＝独立オリジン）
      iframe.setAttribute('sandbox', 'allow-scripts allow-popups allow-popups-to-escape-sandbox allow-forms allow-presentation');
      iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
      iframe.srcdoc = docHtml;
      if (head) { root.innerHTML = head; }
      root.appendChild(iframe);
      return root;
    }
  };

  /* ------------------------------------------------------------ spotMap */
  /* 埋め込みURL or 名前から、Googleマップの検索URLを作る（タップ先） */
  function mapsSearchUrl(name, embedUrl) {
    var q = '';
    try {
      q = new URL(embedUrl).searchParams.get('q') || '';
    } catch (e) { /* ignore */ }
    if (!q) { q = name || ''; }
    if (!q) { return ''; }
    return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q);
  }

  types.spotMap = {
    label: 'スポットマップ',
    icon: '🗺️',
    defaultData: {
      heading: 'Kyoto Spots',
      subheading: '京都おすすめスポット',
      overviewMap: '',
      mapNote: '地図のピンをタップすると、写真や口コミが見られます。',
      spots: [
        { genre: 'ホテル 式場', name: 'RakutenStays 四条河原町', description: '宿泊先のホテルです。四条河原町駅から徒歩約3分。', mapEmbed: '', lat: '35.0036', lng: '135.7682' },
        { genre: 'ホテル 式場', name: 'アトールテラス鴨川', description: '結婚式・宴会会場。鴨川沿いの素敵な会場です。', mapEmbed: '', lat: '35.0083', lng: '135.7722' },
        { genre: '飲食', name: 'さざんか亭', description: '前夜祭ディナーの会場です。みんなで乾杯しましょう！', mapEmbed: '', lat: '35.0050', lng: '135.7670' },
        { genre: '観光', name: '清水寺', description: '言わずと知れた京都の名所。紅葉の季節は特に絶景。', mapEmbed: '', lat: '34.9948', lng: '135.7851' },
        { genre: 'カフェ', name: '仮カフェ', description: 'スプレッドシートのデータに差し替えてください。', mapEmbed: '', lat: '', lng: '' },
        { genre: 'バー 深夜', name: '仮バー', description: 'スプレッドシートのデータに差し替えてください。', mapEmbed: '', lat: '', lng: '' }
      ]
    },
    fields: [
      { key: 'heading', type: 'text', label: '英字見出し' },
      { key: 'subheading', type: 'text', label: '見出し' },
      { key: 'overviewMap', type: 'text', label: '全体マップの埋め込みURL（Googleマイマップ）' },
      { key: 'mapNote', type: 'text', label: '地図の下に出す案内文' },
      { key: 'spots', type: 'list', label: 'スポット', itemLabel: 'スポット', max: 200,
        itemFields: [
          { key: 'genre', type: 'select', label: 'ジャンル',
            options: [
              { value: 'ホテル', label: 'ホテル' },
              { value: '式場', label: '式場' },
              { value: '28日夜宴会会場', label: '28日夜宴会会場' },
              { value: '紅葉スポット', label: '紅葉スポット' },
              { value: '朝ごはん', label: '朝ごはん' },
              { value: '昼食', label: '昼食' },
              { value: 'カフェ 喫茶', label: 'カフェ 喫茶' },
              { value: 'ラーメン そば', label: 'ラーメン そば' },
              { value: '夜ごはん', label: '夜ごはん' },
              { value: '居酒屋 バー', label: '居酒屋 バー' },
              { value: '立ち飲み', label: '立ち飲み' },
              { value: '銭湯', label: '銭湯' },
              { value: '夜景 散歩', label: '夜景 散歩' },
              { value: '観光地', label: '観光地' },
              { value: '美術館', label: '美術館' },
              { value: '穴場', label: '穴場' },
              { value: '本屋', label: '本屋' },
              { value: 'レコード屋', label: 'レコード屋' },
              { value: '古着屋', label: '古着屋' },
              { value: '古道具 アンティーク', label: '古道具 アンティーク' },
              { value: '雑貨 クラフト', label: '雑貨 クラフト' },
              { value: 'お土産', label: 'お土産' },
              { value: 'グルメ', label: 'グルメ（旧）' },
              { value: '雑貨', label: '雑貨（旧）' },
              { value: '観光', label: '観光（旧）' }
            ] },
          { key: 'name',        type: 'text',     label: '名前' },
          { key: 'address',     type: 'text',     label: '住所' },
          { key: 'image',       type: 'image',    label: '写真' },
          { key: 'description', type: 'textarea', label: '説明文' },
          { key: 'link',        type: 'text',     label: 'Googleマップのリンク（タップ先）' },
          { key: 'mapEmbed',    type: 'text',     label: 'Google Maps 埋め込みURL' },
          { key: 'lat',         type: 'text',     label: '緯度 (KML用)' },
          { key: 'lng',         type: 'text',     label: '経度 (KML用)' }
        ]
      }
    ],
    render: function (block) {
      var d = block.data || {};
      var spots = d.spots || [];
      var root = el('div', 'wb-spotmap');

      root.innerHTML = headHtml(d);

      // ジャンル別にグループ化
      var genreOrder = [
        'ホテル', '式場', '28日夜宴会会場', '紅葉スポット',
        '朝ごはん', '昼食', 'カフェ 喫茶', 'ラーメン そば', '夜ごはん', '居酒屋 バー', '立ち飲み',
        '銭湯', '夜景 散歩', '観光地', '美術館', '穴場', 'こども 遊び',
        '本屋', 'レコード屋', '古着屋', '古道具 アンティーク', '雑貨 クラフト', 'お土産',
        'グルメ', '雑貨', '飲食', 'カフェ', 'バー 深夜', '観光'
      ];
      var genreColors = {
        'ホテル': 'pink', '式場': 'ceremony', '28日夜宴会会場': 'banquet', '式場 会場': 'ceremony', 'ホテル 式場': 'pink', '紅葉スポット': 'momiji',
        '朝ごはん': 'sun', '昼食': 'coral', 'カフェ 喫茶': 'green',
        'ラーメン そば': 'amber', '夜ごはん': 'wine', '居酒屋 バー': 'plum', '立ち飲み': 'slate',
        '銭湯': 'sky', '夜景 散歩': 'navy', '観光地': 'teal', '美術館': 'moss', '穴場': 'pine', 'こども 遊び': 'sun',
        '本屋': 'indigo', 'レコード屋': 'vinyl', '古着屋': 'denim', '古道具 アンティーク': 'brown', '雑貨 クラフト': 'violet', 'お土産': 'rose',
        'グルメ': 'coral', '雑貨': 'green', '飲食': 'coral', 'カフェ': 'green', 'バー 深夜': 'navy', '観光': 'teal'
      };
      var groups = {};
      spots.forEach(function (s) { var g = s.genre || '観光'; if (!groups[g]) { groups[g] = []; } groups[g].push(s); });
      // 一覧に無いジャンルも落とさず末尾に回す
      Object.keys(groups).forEach(function (g) {
        if (genreOrder.indexOf(g) === -1) { genreOrder.push(g); }
      });

      /* ---------- マイプラン（この端末にだけ保存される回るリスト） ---------- */
      var PLAN_KEY = 'wedi-myplan-v1';
      function spotKey(s) { return (s.genre || '') + '|' + (s.name || ''); }
      var byKey = {};
      spots.forEach(function (s) { byKey[spotKey(s)] = s; });

      function loadPlan() {
        try {
          var p = JSON.parse(global.localStorage.getItem(PLAN_KEY));
          if (p && Object.prototype.toString.call(p.items) === '[object Array]') { return p; }
        } catch (e) { /* ignore */ }
        return { items: [], manual: false };
      }
      function savePlan(p) {
        try { global.localStorage.setItem(PLAN_KEY, JSON.stringify(p)); } catch (e) { /* ignore */ }
      }
      var plan = loadPlan();
      plan.items = plan.items.filter(function (k) { return byKey[k]; });

      function coordOf(s) {
        if (!s) { return null; }
        var la = parseFloat(s.lat), ln = parseFloat(s.lng);
        return (isFinite(la) && isFinite(ln)) ? [la, ln] : null;
      }
      // 起点はホテル（スポット一覧の RakutenStays を探す。無ければ四条河原町付近）
      var hotelSpot = null;
      spots.forEach(function (s) { if (!hotelSpot && /RakutenStays/i.test(s.name || '')) { hotelSpot = s; } });
      var hotelCoord = coordOf(hotelSpot) || [35.0045, 135.7690];
      var hotelName = (hotelSpot && hotelSpot.name) || 'RakutenStays 四条河原町';

      function distKm(a, b) {
        var R = 6371, dLa = (b[0] - a[0]) * Math.PI / 180, dLn = (b[1] - a[1]) * Math.PI / 180;
        var x = Math.sin(dLa / 2), y = Math.sin(dLn / 2);
        var h = x * x + Math.cos(a[0] * Math.PI / 180) * Math.cos(b[0] * Math.PI / 180) * y * y;
        return 2 * R * Math.asin(Math.sqrt(h));
      }
      // ホテルを起点に「いま居る場所から一番近い所へ」を繰り返す並べ替え
      function autoOrder(keys) {
        var withC = [], noC = [];
        keys.forEach(function (k) { (coordOf(byKey[k]) ? withC : noC).push(k); });
        var ordered = [], cur = hotelCoord;
        while (withC.length) {
          var bi = 0, bd = Infinity;
          for (var i = 0; i < withC.length; i++) {
            var dd = distKm(cur, coordOf(byKey[withC[i]]));
            if (dd < bd) { bd = dd; bi = i; }
          }
          var k2 = withC.splice(bi, 1)[0];
          ordered.push(k2);
          cur = coordOf(byKey[k2]);
        }
        return ordered.concat(noC);
      }

      // 追加/削除のトースト
      var toastTimer = null;
      function toast(msg) {
        var t = root.querySelector('.wb-spotmap__toast');
        if (!t) { t = el('div', 'wb-spotmap__toast'); root.appendChild(t); }
        t.textContent = msg;
        t.classList.add('is-show');
        if (toastTimer) { clearTimeout(toastTimer); }
        toastTimer = setTimeout(function () { t.classList.remove('is-show'); }, 1600);
      }

      /* ---------- 全体マップ ----------
       * Leafletが読み込まれていれば自前のスマホ向けマップを描く。
       * 読み込めない環境（エディタのプレビュー等）はマイマップのiframeにフォールバック。 */
      var frameWrap = el('div', 'wb-spotmap__frame-wrap');
      var hasCoords = spots.some(function (s) { return coordOf(s); });
      var useOwnMap = (typeof global.L !== 'undefined') && !!global.L.map && hasCoords;
      var iframe = null, mapDiv = null, chipsBar = null, sheet = null, locBtn = null;
      var searchInput = null, searchClear = null, resultLine = null;
      if (useOwnMap) {
        frameWrap.classList.add('wb-spotmap__frame-wrap--own');
        var searchWrap = el('div', 'wb-spotmap__search');
        searchWrap.innerHTML =
          '<input type="search" inputmode="search" autocomplete="off" placeholder="店名 ジャンル キーワードで検索" aria-label="スポットを検索">' +
          '<button type="button" class="wb-spotmap__search-clear" aria-label="検索をクリア" hidden>✕</button>';
        searchInput = searchWrap.querySelector('input');
        searchClear = searchWrap.querySelector('button');
        frameWrap.appendChild(searchWrap);
        chipsBar = el('div', 'wb-spotmap__chips');
        frameWrap.appendChild(chipsBar);
        resultLine = el('p', 'wb-spotmap__result');
        frameWrap.appendChild(resultLine);
        var mapHolder = el('div', 'wb-spotmap__map-holder');
        mapDiv = el('div', 'wb-spotmap__leaflet');
        mapHolder.appendChild(mapDiv);
        sheet = el('div', 'wb-spotmap__sheet');
        mapHolder.appendChild(sheet);
        locBtn = el('button', 'wb-spotmap__loc-btn');
        locBtn.type = 'button';
        locBtn.textContent = '現在地';
        mapHolder.appendChild(locBtn);
        frameWrap.appendChild(mapHolder);
      } else {
        iframe = document.createElement('iframe');
        iframe.className = 'wb-spotmap__iframe';
        iframe.setAttribute('loading', 'lazy');
        iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
        iframe.setAttribute('allowfullscreen', '');
        frameWrap.appendChild(iframe);
      }

      if (d.mapNote) {
        var note = el('p', 'wb-spotmap__map-note', esc(d.mapNote));
        frameWrap.appendChild(note);
      }
      root.appendChild(frameWrap);

      /* ---------- マイプランのパネル ---------- */
      var planWrap = el('div', 'wb-spotmap__plan');
      planWrap.innerHTML =
        '<h3 class="wb-spotmap__plan-title">マイプラン</h3>' +
        '<p class="wb-spotmap__plan-lead">気になるスポットを「＋」で追加するとホテルから回りやすい順に<br>ここに並びます（このスマホにだけ保存されます）</p>';
      var planBody = el('div', 'wb-spotmap__plan-body');
      planWrap.appendChild(planBody);
      root.appendChild(planWrap);

      var chip = el('button', 'wb-spotmap__plan-chip');
      chip.type = 'button';
      chip.style.display = 'none';
      chip.addEventListener('click', function () {
        planWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      root.appendChild(chip);

      function updateAddBtns() {
        var btns = root.querySelectorAll('.wb-spotmap__add-btn');
        for (var i = 0; i < btns.length; i++) {
          var inPlan = plan.items.indexOf(btns[i].getAttribute('data-key')) >= 0;
          btns[i].textContent = inPlan ? '✓ プランに入ってます' : '＋ マイプランに追加';
          btns[i].classList.toggle('is-added', inPlan);
        }
      }

      function fmtSeg(km) {
        var mins = Math.round(km * 1000 / 80); // 徒歩80m/分
        if (km >= 2.5) { return '約' + km.toFixed(1) + 'km ─ バス 電車がおすすめ'; }
        var dist = km < 1 ? Math.round(km * 1000 / 10) * 10 + 'm' : km.toFixed(1) + 'km';
        return '徒歩 約' + mins + '分（' + dist + '）';
      }

      var updateMapBadges = function () {};
      var onPlanChange = function () {};
      var jumpToSpot = null;
      var listIndex = [];

      // 説明文の先頭に付く【要予約】をバッジに変換するための分解
      function resvInfo(desc) {
        var d = String(desc || '');
        if (d.indexOf('【要予約】') === 0) { return { resv: true, text: d.slice(5) }; }
        return { resv: false, text: d };
      }

      function renderPlan() {
        var items = plan.items;
        chip.style.display = items.length ? '' : 'none';
        chip.textContent = 'マイプラン ' + items.length + '件';
        if (!items.length) {
          planBody.innerHTML = '<p class="wb-spotmap__plan-empty">まだ空っぽです<br>下のリストから気になる所を追加してね</p>';
          return;
        }
        var html = '<ol class="wb-spotmap__plan-list">';
        html += '<li class="wb-spotmap__plan-start">' + esc(hotelName) + ' からスタート</li>';
        var prev = hotelCoord;
        items.forEach(function (k, idx) {
          var s = byKey[k];
          var c = coordOf(s);
          if (c) {
            html += '<li class="wb-spotmap__plan-seg">' + esc(fmtSeg(distKm(prev, c))) + '</li>';
          }
          html += '<li class="wb-spotmap__plan-item">' +
            '<span class="wb-spotmap__plan-num">' + (idx + 1) + '</span>' +
            '<span class="wb-spotmap__plan-name">' + esc(s.name || '') +
              '<span class="wb-spotmap__plan-genre">' + esc(s.genre || '') + '</span></span>' +
            '<span class="wb-spotmap__plan-ctl">' +
              '<button type="button" data-act="up" data-idx="' + idx + '" aria-label="上へ" ' + (idx === 0 ? 'disabled' : '') + '>↑</button>' +
              '<button type="button" data-act="down" data-idx="' + idx + '" aria-label="下へ" ' + (idx === items.length - 1 ? 'disabled' : '') + '>↓</button>' +
              '<button type="button" data-act="del" data-idx="' + idx + '" aria-label="外す">✕</button>' +
            '</span></li>';
          if (c) { prev = c; }
        });
        html += '</ol>';

        var pts = items.map(function (k) { return coordOf(byKey[k]); }).filter(function (c) { return c; });
        var actions = '<div class="wb-spotmap__plan-actions">';
        if (pts.length) {
          var usable = pts.slice(0, 10);
          var dest = usable[usable.length - 1];
          var ways = usable.slice(0, usable.length - 1);
          var url = 'https://www.google.com/maps/dir/?api=1' +
            '&origin=' + hotelCoord.join(',') +
            '&destination=' + dest.join(',') +
            '&travelmode=walking' +
            (ways.length ? '&waypoints=' + ways.map(function (p) { return p.join(','); }).join('%7C') : '');
          actions += '<a class="wb-spotmap__route-btn" href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">この順でGoogleマップにルートを出す</a>';
          if (pts.length > 10) {
            actions += '<p class="wb-spotmap__plan-note">※Googleマップの都合で、ルート表示は最初の10か所までです</p>';
          }
        }
        actions += '<div class="wb-spotmap__plan-subactions">' +
          '<button type="button" class="wb-spotmap__plan-mini" data-act="auto">おまかせ順に並べ直す</button>' +
          '<button type="button" class="wb-spotmap__plan-mini" data-act="clear">全部けす</button>' +
          '</div></div>';
        planBody.innerHTML = html + actions;
        updateMapBadges();
        onPlanChange();
      }

      planBody.addEventListener('click', function (ev) {
        var btn = ev.target.closest ? ev.target.closest('button[data-act]') : null;
        if (!btn) { return; }
        var act = btn.getAttribute('data-act');
        var idx = parseInt(btn.getAttribute('data-idx'), 10);
        if (act === 'up' && idx > 0) {
          var a = plan.items[idx]; plan.items[idx] = plan.items[idx - 1]; plan.items[idx - 1] = a;
          plan.manual = true;
        } else if (act === 'down' && idx < plan.items.length - 1) {
          var b = plan.items[idx]; plan.items[idx] = plan.items[idx + 1]; plan.items[idx + 1] = b;
          plan.manual = true;
        } else if (act === 'del' && idx >= 0) {
          plan.items.splice(idx, 1);
        } else if (act === 'auto') {
          plan.items = autoOrder(plan.items);
          plan.manual = false;
          toast('回りやすい順に並べ直しました');
        } else if (act === 'clear') {
          plan.items = [];
          plan.manual = false;
          toast('マイプランを空にしました');
        }
        savePlan(plan); renderPlan(); updateAddBtns();
      });

      function togglePlan(spot) {
        var k = spotKey(spot);
        var i = plan.items.indexOf(k);
        if (i >= 0) {
          plan.items.splice(i, 1);
          toast('プランから外しました');
        } else {
          plan.items.push(k);
          if (!plan.manual) { plan.items = autoOrder(plan.items); }
          toast('マイプランに追加！（' + plan.items.length + '件）');
        }
        savePlan(plan); renderPlan(); updateAddBtns();
      }

      /* ---------- スポットリスト（タップでその場に説明＋地図が開く） ---------- */
      var list = el('div', 'wb-spotmap__list');
      var openFirst = true;
      genreOrder.forEach(function (genre) {
        if (!groups[genre]) { return; }
        var group = document.createElement('details');
        group.className = 'wb-spotmap__genre-group';
        if (openFirst) { group.open = true; openFirst = false; }
        var sum = document.createElement('summary');
        sum.className = 'wb-spotmap__genre-sum';
        sum.innerHTML =
          '<span class="wb-spotmap__genre-tag wb-spotmap__genre-tag--' + (genreColors[genre] || 'teal') + '">' +
            esc(genre) +
          '</span>' +
          '<span class="wb-spotmap__genre-count">' + groups[genre].length + '件</span>';
        group.appendChild(sum);
        var countEl = sum.querySelector('.wb-spotmap__genre-count');

        groups[genre].forEach(function (spot) {
          var item = el('div', 'wb-spotmap__item');
          var img = safeUrl(spot.image);
          var ri = resvInfo(spot.description);
          var head = el('button', 'wb-spotmap__item-head');
          head.type = 'button';
          head.innerHTML =
            (img ? '<span class="wb-spotmap__thumb"><img src="' + esc(img) + '" alt="" loading="lazy"></span>' : '') +
            '<span class="wb-spotmap__item-body">' +
              '<span class="wb-spotmap__item-name">' + esc(spot.name || '（名称未設定）') +
                (ri.resv ? '<span class="wb-spotmap__resv">要予約</span>' : '') + '</span>' +
              (ri.text ? '<span class="wb-spotmap__item-desc">' + esc(ri.text) + '</span>' : '') +
            '</span>' +
            '<span class="wb-spotmap__item-chev" aria-hidden="true"></span>';
          item.appendChild(head);

          var detail = el('div', 'wb-spotmap__item-detail');
          var filled = false;
          head.addEventListener('click', function () {
            var opening = !item.classList.contains('is-open');
            item.classList.toggle('is-open', opening);
            if (opening && !filled) {
              filled = true;
              var c = coordOf(spot);
              var mapSrc = safeMapEmbed(spot.mapEmbed) ||
                (c ? 'https://www.google.com/maps?q=' + encodeURIComponent(c.join(',')) + '&output=embed' : '');
              var gmaps = safeUrl(spot.link) || mapsSearchUrl(spot.name, spot.mapEmbed);
              detail.innerHTML =
                (spot.address ? '<p class="wb-spotmap__addr">' + esc(spot.address) + '</p>' : '') +
                (spot.note ? '<p class="wb-spotmap__note">🌼 ' + esc(spot.note) + '</p>' : '') +
                (mapSrc ? '<div class="wb-spotmap__mini-map"><iframe loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="' + esc(mapSrc) + '"></iframe></div>' : '') +
                '<div class="wb-spotmap__item-actions">' +
                  '<button type="button" class="wb-spotmap__add-btn" data-key="' + esc(spotKey(spot)) + '"></button>' +
                  (c && useOwnMap ? '<button type="button" class="wb-spotmap__mapjump-btn">上の地図で見る</button>' : '') +
                  (gmaps ? '<a class="wb-spotmap__gmaps-link" href="' + esc(gmaps) + '" target="_blank" rel="noopener noreferrer">Googleマップで見る ↗</a>' : '') +
                '</div>';
              var addBtn = detail.querySelector('.wb-spotmap__add-btn');
              addBtn.addEventListener('click', function () { togglePlan(spot); });
              var jumpBtn = detail.querySelector('.wb-spotmap__mapjump-btn');
              if (jumpBtn) {
                jumpBtn.addEventListener('click', function () { if (jumpToSpot) { jumpToSpot(spot); } });
              }
              updateAddBtns();
            }
          });
          item.appendChild(detail);
          group.appendChild(item);
          listIndex.push({ spot: spot, item: item, group: group, genre: genre, countEl: countEl });
        });
        list.appendChild(group);
      });
      root.appendChild(list);

      /* ---------- 自前マップの初期化 ---------- */
      function initOwnMap() {
        var L = global.L;
        var genreHex = {
          pink: '#ec775b', coral: '#e07050', green: '#5a8a5a', navy: '#3a4a7a',
          teal: '#3a7a70', momiji: '#b8452c', plum: '#6b3f6b', amber: '#a8722a', sky: '#2f6f92',
          sun: '#d29b18', wine: '#8a2f4a', slate: '#5c6672', moss: '#77803b', pine: '#2f5d3f',
          indigo: '#4a5aa8', brown: '#7a5c44', violet: '#8a63b8', rose: '#c2557a',
          vinyl: '#3b3b42', denim: '#4877a8', ceremony: '#d1425f', banquet: '#aa4d6d'
        };
        function colorOf(s) { return genreHex[genreColors[s.genre || '観光']] || '#3a7a70'; }
        var genreEmoji = {
          'ホテル': '🏨', '式場': '💒', '28日夜宴会会場': '🥂', 'ホテル 式場': '🏨', '式場 会場': '💒',
          '紅葉スポット': '🍁', '朝ごはん': '🍳', '昼食': '🍚',
          'カフェ 喫茶': '☕', 'ラーメン そば': '🍜', '夜ごはん': '🍽️', '居酒屋 バー': '🍶',
          '立ち飲み': '🍺', '銭湯': '♨️', '夜景 散歩': '🌙', '観光地': '⛩️',
          '美術館': '🖼️', '穴場': '🌿', 'こども 遊び': '🎡', '本屋': '📚', 'レコード屋': '💿',
          '古着屋': '👕', '古道具 アンティーク': '🏺', '雑貨 クラフト': '🧺', 'お土産': '🛍️'
        };

        var map = L.map(mapDiv, { zoomControl: true, scrollWheelZoom: false });  // ページスクロール中の誤ズーム防止
        map.attributionControl.setPrefix('');
        /* ---- ベースマップ ----
         * 第1候補: ベクター地図（MapLibre + OSM Japan osm-bright-ja）
         *   → 拡大してもにじまず、日本語ラベル優先で一番きれい。
         * WebGLが使えない・スタイルが読めない場合は高精細ラスター（@2x）に、
         * それも読めない環境ではさらに別のタイルへ自動フォールバック。 */
        var osmAttr = '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>';
        var jpAttr = osmAttr + ' / <a href="https://tile.openstreetmap.jp/" target="_blank" rel="noopener">OSM Japan</a>';
        var STYLE_URL = 'https://tile.openstreetmap.jp/styles/osm-bright-ja/style.json';

        function addRasterBase() {
          var brightJa = L.tileLayer('https://tile.openstreetmap.jp/styles/osm-bright-ja/{z}/{x}/{y}{r}.png', {
            maxZoom: 19,
            attribution: jpAttr
          });
          var fellBack = false;
          var errs = 0;
          brightJa.on('tileerror', function () {
            errs++;
            if (!fellBack && errs >= 2) {
              fellBack = true;
              map.removeLayer(brightJa);
              L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: osmAttr
              }).addTo(map);
            }
          });
          brightJa.addTo(map);
        }

        function hasWebGL() {
          try {
            var cv = document.createElement('canvas');
            return !!(cv.getContext('webgl') || cv.getContext('experimental-webgl'));
          } catch (e) { return false; }
        }

        (function pickBase() {
          var canVector = (typeof global.maplibregl !== 'undefined') && L.maplibreGL && hasWebGL();
          if (!canVector) { addRasterBase(); return; }
          // スタイルJSONが読める環境かを軽く確認してからベクターを使う
          var done = false;
          var ctrl = ('AbortController' in global) ? new AbortController() : null;
          var timer = setTimeout(function () {
            if (done) { return; }
            done = true;
            if (ctrl) { ctrl.abort(); }
            addRasterBase();
          }, 4000);
          fetch(STYLE_URL, ctrl ? { signal: ctrl.signal } : undefined)
            .then(function (r) { if (!r.ok) { throw new Error('style'); } return r.json(); })
            .then(function () {
              if (done) { return; }
              done = true;
              clearTimeout(timer);
              try {
                L.maplibreGL({ style: STYLE_URL, attribution: jpAttr }).addTo(map);
              } catch (e) { addRasterBase(); }
            })
            .catch(function () {
              if (done) { return; }
              done = true;
              clearTimeout(timer);
              addRasterBase();
            });
        })();
        map.setView(hotelCoord, 15);

        function openSheet(s) {
          var gmaps = safeUrl(s.link) || mapsSearchUrl(s.name, s.mapEmbed);
          var ri = resvInfo(s.description);
          sheet.innerHTML =
            '<button type="button" class="wb-spotmap__sheet-close" aria-label="閉じる">✕</button>' +
            '<span class="wb-spotmap__genre-tag wb-spotmap__genre-tag--' + (genreColors[s.genre] || 'teal') + '">' + esc(s.genre || '') + '</span>' +
            '<p class="wb-spotmap__sheet-name">' + esc(s.name || '') +
              (ri.resv ? '<span class="wb-spotmap__resv">要予約</span>' : '') + '</p>' +
            (s.address ? '<p class="wb-spotmap__addr">' + esc(s.address) + '</p>' : '') +
            (ri.text ? '<p class="wb-spotmap__sheet-desc">' + esc(ri.text) + '</p>' : '') +
            (s.note ? '<p class="wb-spotmap__note">🌼 ' + esc(s.note) + '</p>' : '') +
            '<div class="wb-spotmap__item-actions">' +
              '<button type="button" class="wb-spotmap__add-btn" data-key="' + esc(spotKey(s)) + '"></button>' +
              (gmaps ? '<a class="wb-spotmap__gmaps-link" href="' + esc(gmaps) + '" target="_blank" rel="noopener noreferrer">Googleマップで見る ↗</a>' : '') +
            '</div>';
          sheet.classList.add('is-open');
          sheet.querySelector('.wb-spotmap__sheet-close').addEventListener('click', function () {
            sheet.classList.remove('is-open');
          });
          sheet.querySelector('.wb-spotmap__add-btn').addEventListener('click', function () { togglePlan(s); });
          updateAddBtns();
        }
        map.on('click', function (ev) {
          // ピンやバッジを押した時は閉じない（何も無い所を押した時だけ閉じる）
          var t = ev && ev.originalEvent && ev.originalEvent.target;
          if (t && t.closest && (t.closest('path') || t.closest('.wb-spotmap__pin') || t.closest('.wb-spotmap__map-badge'))) { return; }
          sheet.classList.remove('is-open');
        });

        // ジャンル色＋絵文字の丸ピン
        var markers = [];
        spots.forEach(function (s) {
          var c = coordOf(s);
          if (!c) { return; }
          var g = s.genre || '観光';
          var mk = L.marker(c, {
            icon: L.divIcon({
              className: 'wb-spotmap__pin',
              html: '<span class="wb-spotmap__pin-in" style="background:' + colorOf(s) + '">' + (genreEmoji[g] || '📍') + '</span>',
              iconSize: [26, 26],
              iconAnchor: [13, 13]
            }),
            keyboard: false
          });
          mk.on('click', function (ev) {
            if (ev && ev.originalEvent) { L.DomEvent.stopPropagation(ev.originalEvent); }
            openSheet(s);
          });
          mk.addTo(map);
          markers.push({ spot: s, marker: mk });
        });

        // マイプランに入れたスポットは番号バッジで表示
        var badgeLayer = L.layerGroup().addTo(map);
        updateMapBadges = function () {
          badgeLayer.clearLayers();
          plan.items.forEach(function (k, i) {
            var s = byKey[k];
            var c = coordOf(s);
            if (!c) { return; }
            badgeLayer.addLayer(
              L.marker(c, {
                icon: L.divIcon({ className: 'wb-spotmap__map-badge', html: String(i + 1), iconSize: [24, 24], iconAnchor: [12, 12] }),
                zIndexOffset: 1000
              }).on('click', function (ev) {
                if (ev && ev.originalEvent) { L.DomEvent.stopPropagation(ev.originalEvent); }
                openSheet(s);
              })
            );
          });
        };
        updateMapBadges();

        // リストのカードから「上の地図で見る」で飛んでくる用
        jumpToSpot = function (s) {
          var c = coordOf(s);
          if (!c) { return; }
          frameWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
          map.setView(c, Math.max(map.getZoom(), 17));
          openSheet(s);
        };

        // 検索 × ジャンル × ♥プランの絞り込み（地図のピンとリストの両方に効く）
        var activeGenre = '';
        var planOnly = false;
        var query = '';

        function matches(s) {
          if (activeGenre && (s.genre || '観光') !== activeGenre) { return false; }
          if (planOnly && plan.items.indexOf(spotKey(s)) < 0) { return false; }
          if (query) {
            var hay = ((s.name || '') + ' ' + (s.genre || '') + ' ' + (s.description || '') + ' ' + (s.address || '')).toLowerCase();
            var toks = query.split(/[\s　]+/);
            for (var i = 0; i < toks.length; i++) {
              if (toks[i] && hay.indexOf(toks[i]) < 0) { return false; }
            }
          }
          return true;
        }

        function applyFilter() {
          markers.forEach(function (m) {
            var show = matches(m.spot);
            if (show) { if (!map.hasLayer(m.marker)) { m.marker.addTo(map); } }
            else if (map.hasLayer(m.marker)) { map.removeLayer(m.marker); }
          });
          var groupVisible = {};
          var total = 0;
          listIndex.forEach(function (en) {
            var show = matches(en.spot);
            en.item.style.display = show ? '' : 'none';
            if (show) { groupVisible[en.genre] = (groupVisible[en.genre] || 0) + 1; total++; }
          });
          listIndex.forEach(function (en) {
            var n = groupVisible[en.genre] || 0;
            en.group.style.display = n ? '' : 'none';
            if (en.countEl) { en.countEl.textContent = n + '件'; }
            if (n && (query || planOnly)) { en.group.open = true; }
          });
          if (resultLine) {
            var filtered = !!(activeGenre || planOnly || query);
            resultLine.textContent = filtered ? total + '件みつかりました' : '';
            resultLine.style.display = filtered ? '' : 'none';
          }
        }

        function chipSym(emoji, hex) {
          return '<span class="wb-spotmap__chip-sym" style="background:' + hex + '">' + emoji + '</span>';
        }
        function refreshChipStates() {
          var cs = chipsBar.querySelectorAll('.wb-spotmap__chip[data-genre]');
          for (var i = 0; i < cs.length; i++) {
            cs[i].classList.toggle('is-on', cs[i].getAttribute('data-genre') === activeGenre);
          }
        }

        // ♥プランだけ表示（トグル）
        var planChip = document.createElement('button');
        planChip.type = 'button';
        planChip.className = 'wb-spotmap__chip wb-spotmap__chip--plan';
        function renderPlanChip() {
          planChip.innerHTML = chipSym('♥', genreHex.rose) + 'プラン <small>' + plan.items.length + '</small>';
        }
        renderPlanChip();
        planChip.addEventListener('click', function () {
          planOnly = !planOnly;
          planChip.classList.toggle('is-on', planOnly);
          sheet.classList.remove('is-open');
          applyFilter();
        });
        chipsBar.appendChild(planChip);
        onPlanChange = function () {
          renderPlanChip();
          if (planOnly) { applyFilter(); }
        };

        // すべて＋ジャンルチップ
        function makeChip(label, genre, emoji, hex) {
          var b = document.createElement('button');
          b.type = 'button';
          b.className = 'wb-spotmap__chip' + (genre === '' ? ' is-on' : '');
          b.setAttribute('data-genre', genre);
          b.innerHTML = (emoji ? chipSym(emoji, hex) : '') + esc(label) +
            (genre ? ' <small>' + groups[genre].length + '</small>' : '');
          b.addEventListener('click', function () {
            activeGenre = (activeGenre === genre) ? '' : genre;
            refreshChipStates();
            var allChip = chipsBar.querySelector('.wb-spotmap__chip[data-genre=""]');
            if (allChip) { allChip.classList.toggle('is-on', activeGenre === ''); }
            sheet.classList.remove('is-open');
            applyFilter();
          });
          chipsBar.appendChild(b);
        }
        makeChip('すべて', '', null, null);
        genreOrder.forEach(function (g) {
          if (!groups[g]) { return; }
          makeChip(g, g, genreEmoji[g] || '📍', genreHex[genreColors[g]] || '#3a7a70');
        });

        // 検索ボックス
        if (searchInput) {
          var debounceTimer = null;
          searchInput.addEventListener('input', function () {
            if (debounceTimer) { clearTimeout(debounceTimer); }
            debounceTimer = setTimeout(function () {
              query = searchInput.value.trim().toLowerCase();
              if (searchClear) { searchClear.hidden = !searchInput.value; }
              applyFilter();
            }, 160);
          });
          if (searchClear) {
            searchClear.addEventListener('click', function () {
              searchInput.value = '';
              query = '';
              searchClear.hidden = true;
              applyFilter();
              searchInput.focus();
            });
          }
        }
        applyFilter();

        // 現在地（当日、歩きながら使えるように）
        var youMarker = null;
        locBtn.addEventListener('click', function () {
          if (!global.navigator || !global.navigator.geolocation) { toast('この端末では現在地を取得できません'); return; }
          locBtn.disabled = true;
          global.navigator.geolocation.getCurrentPosition(function (pos) {
            locBtn.disabled = false;
            var c = [pos.coords.latitude, pos.coords.longitude];
            if (youMarker) { youMarker.setLatLng(c); }
            else {
              youMarker = L.circleMarker(c, { radius: 9, color: '#fff', weight: 2, fillColor: '#2b6fdc', fillOpacity: 1 }).addTo(map);
              youMarker.bindTooltip('いまここ', { direction: 'top', offset: [0, -8] });
            }
            map.setView(c, Math.max(map.getZoom(), 15));
          }, function () {
            locBtn.disabled = false;
            toast('現在地が取得できませんでした（位置情報の許可を確認してね）');
          }, { enableHighAccuracy: true, timeout: 8000 });
        });

        // 非表示状態で初期化された場合に備えてサイズを取り直す
        if (global.ResizeObserver) {
          new global.ResizeObserver(function () { map.invalidateSize(); }).observe(mapDiv);
        }
        setTimeout(function () { map.invalidateSize(); }, 500);
      }

      renderPlan();

      if (useOwnMap) {
        initOwnMap();
      } else if (iframe) {
        // フォールバック: 全体マップ（マイマップ）があればそれを、無ければ先頭スポットを表示
        var first = spots[0];
        var fallback = first
          ? (safeMapEmbed(first.mapEmbed) || (first.lat && first.lng
              ? safeMapEmbed('https://www.google.com/maps?q=' + encodeURIComponent(first.lat + ',' + first.lng) + '&output=embed')
              : ''))
          : '';
        var src = safeMapEmbed(d.overviewMap) || fallback;
        if (src) { iframe.src = src; frameWrap.classList.remove('is-empty'); }
        else { frameWrap.classList.add('is-empty'); }
      }

      return root;
    },
    hydrate: function () {
      /* 開閉・マイプランのイベントは render 内で束ねている */
    }
  };

  /* パレット表示順（招待状の王道順 → しおり用は後ろ） */
  var order = ['cover', 'countdown', 'message', 'profile', 'album', 'partyInfo', 'request', 'rsvp',
    'photoCta', 'schedule', 'map', 'spotMap', 'photo', 'text', 'image', 'embed'];

  function defaultStyle() {
    return {
      bg: 'none', align: 'center', spacing: 'normal', width: 'normal', tilt: 'none',
      customBg: '', customText: '',
      decoration: 'default', decorationPosition: 'top-right', decorationSize: 'medium', decorationColor: ''
    };
  }

  WEDI.schema = {
    types: types,
    order: order,
    defaultStyle: defaultStyle
  };
})(window);
