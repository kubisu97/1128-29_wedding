/* ===========================================================================
 * memories-intro.js — 思い出アルバムのオープニング演出（お礼のメッセージ）
 *
 * window.MemIntro.play() で演出を流し、終わったら解決する Promise を返す。
 * 見た目と動きは招待状ページ（緑のポスター調）に合わせている。スタイルは css/memories-intro.css。
 * - 同じ端末では 1 日 1 回だけ流す（何度も開く人を待たせないため）。?intro を付けると必ず流す
 * - 11/29 は「本日は」、11/30 以降は「先日は」
 * - 「写真を見る」かスキップで終わる。演出の裏で合言葉の確認や写真の読み込みは先に進めておく
 * =========================================================================== */
(function () {
  'use strict';

  var SEEN_KEY = 'tk1129-memories-intro';
  var POL_PHOTOS = ['our-beginning', 'kiyomizu-enhanced', 'happy-wedding', 'shrine-night', 'miyajima', 'river-day'];
  var BAND_TEXT = ['Thank you', '2026.11.29', 'Kyoto', 'Takuro and Kazumi'];
  // 紙吹雪の色（生成り・ピンク・オレンジ）。memories-intro.css の --iv-* と同じ値
  var COLORS = ['#f8edda', '#ecd9d1', '#e66f50', '#f8edda'];
  // assets/soft-star.svg と同じ輪郭（100×100 の座標）
  var STAR = [50, 5, 63, 19, 82, 18, 81, 37, 95, 50, 81, 63, 82, 82, 63, 81, 50, 95, 37, 81, 18, 82, 19, 63, 5, 50, 19, 37, 18, 18, 37, 19];

  // 時間の流れ（秒）。色の面・星・カード・帯などの固定の遅れは memories-intro.css 側にある
  var T = { chars: 1.75, charStep: 0.07, hop: 4.7, hopStep: 0.09, burst: 2.45, label: 2.65, labelStep: 0.2,
    pols: 3.0, polStep: 0.12, sub: 3.6, go: 3.85 };

  function todayJst() {
    try { return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Tokyo' }).format(new Date()); }
    catch (e) { return new Date().toISOString().slice(0, 10); }
  }

  /* ---------- 紙吹雪（ベタ塗りの四角・丸・星） ---------- */
  function Confetti(canvas) {
    var ctx = canvas.getContext('2d');
    var parts = [], raining = false, raf = 0, w = 0, h = 0;

    function resize() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function make(x, y, vx, vy) {
      var kind = Math.random();
      return {
        x: x, y: y, vx: vx, vy: vy,
        size: 7 + Math.random() * 9,
        rot: Math.random() * Math.PI * 2, vr: (Math.random() - 0.5) * 0.24,
        flip: Math.random() * Math.PI * 2, vf: 0.07 + Math.random() * 0.1,
        sway: 0.3 + Math.random() * 0.8, t: Math.random() * 10,
        color: COLORS[(Math.random() * COLORS.length) | 0],
        shape: kind < 0.3 ? 'star' : (kind < 0.55 ? 'dot' : 'rect')
      };
    }
    function burst(x, y, n, power) {
      for (var i = 0; i < n; i++) {
        var a = Math.random() * Math.PI * 2;
        var v = power * (0.35 + Math.random() * 0.65);
        parts.push(make(x, y, Math.cos(a) * v, Math.sin(a) * v - power * 0.35));
      }
      start();
    }
    function draw(p) {
      ctx.fillStyle = p.color;
      if (p.shape === 'dot') {
        ctx.beginPath(); ctx.arc(0, 0, p.size * 0.45, 0, Math.PI * 2); ctx.fill();
      } else if (p.shape === 'star') {
        var s = p.size * 1.7 / 100;
        ctx.beginPath();
        for (var i = 0; i < STAR.length; i += 2) {
          var px = (STAR[i] - 50) * s, py = (STAR[i + 1] - 50) * s;
          if (i === 0) { ctx.moveTo(px, py); } else { ctx.lineTo(px, py); }
        }
        ctx.closePath(); ctx.fill();
      } else {
        ctx.scale(1, Math.cos(p.flip));     // 紙が裏返る動き
        ctx.fillRect(-p.size * 0.4, -p.size * 0.6, p.size * 0.8, p.size * 1.2);
      }
    }
    function tick() {
      raf = 0;
      ctx.clearRect(0, 0, w, h);
      if (raining && parts.length < 70 && Math.random() < 0.35) {
        parts.push(make(Math.random() * w, -20, (Math.random() - 0.5) * 0.6, 1 + Math.random() * 1.4));
      }
      for (var i = parts.length - 1; i >= 0; i--) {
        var p = parts[i];
        p.vy = Math.min(p.vy + 0.09, 3);    // 重力。落ちる速さには上限（ひらひら落ちる）
        p.vx *= 0.985;
        p.t += 0.05; p.rot += p.vr; p.flip += p.vf;
        p.x += p.vx + Math.sin(p.t) * p.sway;
        p.y += p.vy;
        if (p.y > h + 30) { parts.splice(i, 1); continue; }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        draw(p);
        ctx.restore();
      }
      if (parts.length || raining) { raf = requestAnimationFrame(tick); }
    }
    function start() { if (!raf) { raf = requestAnimationFrame(tick); } }

    resize();
    window.addEventListener('resize', resize);
    return {
      burst: burst,
      rain: function (on) { raining = on; if (on) { start(); } },
      stop: function () {
        raining = false; parts = [];
        if (raf) { cancelAnimationFrame(raf); raf = 0; }
        window.removeEventListener('resize', resize);
      }
    };
  }

  function play() {
    var intro = document.getElementById('intro');
    if (!intro) { return Promise.resolve(); }
    var force = /[?&]intro\b/.test(location.search);
    var today = todayJst();
    try { if (!force && localStorage.getItem(SEEN_KEY) === today) { return Promise.resolve(); } } catch (e) {}

    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    var thanks = document.getElementById('introThanks');
    var msg = document.getElementById('introMsg');
    var sub = document.getElementById('introSub');
    var go = document.getElementById('introGo');
    var skip = document.getElementById('introSkip');
    var pols = document.getElementById('introPols');
    var band = document.getElementById('introBand');

    // 見出し「THANK YOU!」を単語ごとに行に分け、1文字ずつ出す
    var label = thanks.textContent;
    thanks.textContent = '';
    thanks.setAttribute('aria-label', label);
    var n = 0;
    label.split(' ').forEach(function (word) {
      var ln = document.createElement('span');
      ln.className = 'ln';
      ln.setAttribute('aria-hidden', 'true');
      Array.prototype.forEach.call(word, function (c) {
        var ch = document.createElement('span');
        ch.className = 'ch';
        ch.textContent = c;
        // 1つめは出てくる動き、2つめは出そろったあとに順番に跳ねる動きの開始時刻
        ch.style.animationDelay = (T.chars + T.charStep * n).toFixed(2) + 's, ' + (T.hop + T.hopStep * n).toFixed(2) + 's';
        ln.appendChild(ch);
        n++;
      });
      thanks.appendChild(ln);
    });

    // お礼の文。式の当日は「本日は」、それ以降は「先日は」
    var lines = [(today > '2026-11-29' ? '先日は' : '本日は') + 'お越しいただき', 'ありがとうございました'];
    lines.forEach(function (text, i) {
      var lb = document.createElement('span');
      lb.className = 'lb';
      lb.textContent = text;
      lb.style.animationDelay = (T.label + T.labelStep * i).toFixed(2) + 's';
      msg.appendChild(lb);
    });
    sub.style.animationDelay = T.sub + 's';
    go.style.animationDelay = T.go + 's, ' + (T.go + 0.9).toFixed(2) + 's';

    // まわりの写真
    POL_PHOTOS.forEach(function (name, i) {
      var p = document.createElement('div');
      p.className = 'mem-pol mem-pol--' + (i + 1);
      p.style.animationDelay = (T.pols + T.polStep * i).toFixed(2) + 's';
      var inner = document.createElement('div');
      inner.className = 'mem-pol__in';
      var img = document.createElement('img');
      img.alt = '';
      img.src = 'assets/photos/' + name + '.jpg';
      inner.appendChild(img);
      p.appendChild(inner);
      pols.appendChild(p);
    });

    // 下の帯。同じ並びを2回入れて、半分流れたら頭に戻す（つなぎ目が見えない）
    for (var half = 0; half < 2; half++) {
      for (var rep = 0; rep < 4; rep++) {
        BAND_TEXT.forEach(function (text) {
          var s = document.createElement('span');
          s.textContent = text + ' •';
          band.appendChild(s);
        });
      }
    }

    intro.hidden = false;
    document.body.classList.add('is-locked');

    var confetti = reduce ? null : Confetti(document.getElementById('introCanvas'));
    var timers = [];
    function later(sec, fn) { timers.push(setTimeout(fn, sec * 1000)); }
    if (confetti) {
      later(T.burst, function () {
        var r = thanks.getBoundingClientRect();
        // カードの後ろからはじけて、まわりへ飛び出す
        confetti.burst(r.left + r.width / 2, r.top + r.height / 2, 110, 17);
        confetti.rain(true);
      });
    }

    return new Promise(function (resolve) {
      var done = false;
      function finish(quick) {
        if (done) { return; }
        done = true;
        timers.forEach(clearTimeout);
        try { localStorage.setItem(SEEN_KEY, today); } catch (e) {}
        if (confetti && !quick) {
          // ボタンからもう一度はじけさせてから、オレンジの面で覆って上へ抜ける
          var r = go.getBoundingClientRect();
          confetti.burst(r.left + r.width / 2, r.top + r.height / 2, 80, 17);
          confetti.rain(false);
        }
        intro.classList.add(quick ? 'is-skipping' : 'is-leaving');
        setTimeout(function () {
          if (confetti) { confetti.stop(); }
          intro.hidden = true;
          intro.classList.remove('is-skipping', 'is-leaving');
          pols.innerHTML = '';
          band.innerHTML = '';
          document.body.classList.remove('is-locked');
          resolve();
        }, reduce ? 220 : (quick ? 400 : 950));
      }
      go.addEventListener('click', function () { finish(false); });
      skip.addEventListener('click', function () { finish(true); });
      document.addEventListener('keydown', function onKey(ev) {
        if (ev.key === 'Escape') { document.removeEventListener('keydown', onKey); finish(true); }
      });
    });
  }

  window.MemIntro = { play: play };
})();
