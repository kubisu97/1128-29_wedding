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
      image: '',
      letteringImage: '',                 // 手描き筆文字PNG（透過）。空ならテキストにフォールバック
      lettering: 'WEDDING\nINVITATION',
      names: 'SHUNPEI and KONOMI',
      date: '2026.11.29'
    },
    fields: [
      { key: 'image', type: 'image', label: '写真' },
      { key: 'letteringImage', type: 'image', label: '筆文字PNG（透過・任意）' },
      { key: 'lettering', type: 'textarea', label: '大きな英字（PNG未設定時の文字）' },
      { key: 'names', type: 'text', label: 'お名前（英字）' },
      { key: 'date', type: 'text', label: '日付' }
    ],
    render: function (block) {
      var d = block.data || {};
      var root = el('div', 'wb-cover');
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
      images: [
        { src: '', alt: '' }, { src: '', alt: '' }, { src: '', alt: '' }
      ]
    },
    fields: [
      { key: 'heading', type: 'text', label: '英字見出し' },
      { key: 'subheading', type: 'text', label: '見出し' },
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
          '<img src="' + esc(safeUrl(it.src)) + '" alt="' + esc(it.alt || '') + '" loading="lazy"></div>';
      }).join('');
      var thumbs = imgs.map(function (it, i) {
        return '<button class="wb-album__thumb' + (i === 0 ? ' is-active' : '') + '" data-i="' + i + '" type="button">' +
          '<img src="' + esc(safeUrl(it.src)) + '" alt=""></button>';
      }).join('');
      root.innerHTML = headHtml(d) +
        (imgs.length
          ? '<div class="wb-album__stage">' +
              '<button class="wb-album__nav wb-album__nav--prev" type="button" aria-label="前へ">‹</button>' +
              '<div class="wb-album__slides">' + slides + '</div>' +
              '<button class="wb-album__nav wb-album__nav--next" type="button" aria-label="次へ">›</button>' +
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
      if (!slides.length) { return; }
      var cur = 0;
      function show(i) {
        cur = (i + slides.length) % slides.length;
        slides.forEach(function (s, k) { s.classList.toggle('is-active', k === cur); });
        thumbs.forEach(function (t, k) { t.classList.toggle('is-active', k === cur); });
      }
      var prev = root.querySelector('.wb-album__nav--prev');
      var next = root.querySelector('.wb-album__nav--next');
      if (prev) { prev.addEventListener('click', function () { show(cur - 1); }); }
      if (next) { next.addEventListener('click', function () { show(cur + 1); }); }
      thumbs.forEach(function (t) {
        t.addEventListener('click', function () { show(parseInt(t.dataset.i, 10)); });
      });
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
        { name: '挙式', start: '10:30', sub1Label: '受付', sub1: '10:00', sub2Label: '終了予定', sub2: '11:00' },
        { name: '披露宴', start: '11:30', sub1Label: '受付', sub1: '11:00', sub2Label: 'お開き', sub2: '14:30' }
      ],
      venueLabel: '会場情報',
      venueName: 'アトールテラス鴨川',
      venueLines: '〒600-0000\n京都府京都市○-○-○\nTEL : 00-0000-0000'
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
        { key: 'sub2', type: 'text', label: '補足2' }
      ] },
      { key: 'venueLabel', type: 'text', label: '会場ラベル' },
      { key: 'venueName', type: 'text', label: '会場名' },
      { key: 'venueLines', type: 'textarea', label: '会場の住所・TEL（改行可）' }
    ],
    render: function (block) {
      var d = block.data || {};
      var root = el('div', 'wb-party');
      var sessions = (d.sessions || []).map(function (s) {
        return '<div class="wb-party__card">' +
          '<p class="wb-party__name txt-serif"><span class="wb-rule"></span>' + esc(s.name || '') + '<span class="wb-rule"></span></p>' +
          '<p class="wb-party__start">開始時刻 <b class="txt-serif">' + esc(s.start || '') + '</b></p>' +
          '<p class="wb-party__sub">' +
            (s.sub1Label || s.sub1 ? esc(s.sub1Label || '') + ' ' + esc(s.sub1 || '') : '') +
            (s.sub2Label || s.sub2 ? '　/　' + esc(s.sub2Label || '') + ' ' + esc(s.sub2 || '') : '') +
          '</p>' +
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
      cardBody: '誠に恐れ入りますが\n挙式にもご列席賜りたく\n当日は ○時○分 迄に\nご光来のほど\nよろしくお願い申し上げます'
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
      busInfo: '当日　送迎バスをご用意しております\nご利用を希望される場合はお知らせくださいませ',
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
      { key: 'busInfo', type: 'textarea', label: '送迎バス案内（空なら非表示）' },
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
        ? '<div class="wb-rsvp__field"><label>送迎バス</label>' +
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
            '<p class="wb-rsvp__hintnote">同席される方がいる場合は人数を選び、お名前をご記入ください。</p>' +
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
          (d.askCeremony ? attendGroup('attend_ceremony', '挙式') : '') +
          (d.askReception ? attendGroup('attend_reception', '披露宴') : '') +
          '<p class="wb-rsvp__hint"><i class="wb-req">*</i> は必須項目です</p>' +
          '<div class="wb-rsvp__field"><label>いずれかをお選びください <i class="wb-req">*</i></label>' +
            '<div class="wb-rsvp__twin">' +
              '<label class="wb-pickbtn"><input type="radio" name="guest_side" value="新郎ゲスト"><span>新郎ゲスト</span></label>' +
              '<label class="wb-pickbtn"><input type="radio" name="guest_side" value="新婦ゲスト"><span>新婦ゲスト</span></label>' +
            '</div></div>' +
          twin('お名前', 'name', '姓', '名', true) +
          twin('お名前（ローマ字）', 'name_roma', 'Sei', 'Mei', false) +
          f('間柄', 'relation', { ph: '例: 友人 / 親族' }) +
          f('郵便番号', 'zip', { ph: '100-0000' }) +
          f('都道府県・市区町村', 'address1', { ph: '東京都新宿区新宿' }) +
          f('丁目・番地', 'address2', { ph: '1-36-2' }) +
          f('建物名・部屋番号など', 'address3', { ph: '新宿第七葉山ビル 301' }) +
          f('電話番号（半角数字・ハイフン）', 'tel', { ph: '090-1234-5678' }) +
          f('メールアドレス', 'email', { type: 'email', ph: 'sample@example.com', required: true }) +
          '<div class="wb-rsvp__field"><label>アレルギーについて</label>' +
            '<label class="wb-radio"><input type="radio" name="allergy" value="なし"> アレルギーなし</label>' +
            '<label class="wb-radio"><input type="radio" name="allergy" value="あり"> アレルギーあり</label>' +
            '<input type="text" name="allergy_detail" placeholder="アレルギー内容" class="wb-rsvp__allergydetail">' +
          '</div>' +
          companions +
          f('ひとことメッセージ', 'message', { type: 'textarea' }) +
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
          var existing = compList.querySelectorAll('.wb-rsvp__companion-row').length;
          // 入力済みの値を保持しつつ増減
          if (n < existing) {
            var rows = compList.querySelectorAll('.wb-rsvp__companion-row');
            for (var r = existing - 1; r >= n; r--) { rows[r].remove(); }
          } else {
            for (var i = existing; i < n; i++) {
              var row = document.createElement('div');
              row.className = 'wb-rsvp__companion-row';
              row.innerHTML =
                '<input type="text" name="companion_' + (i + 1) + '_name" placeholder="同席者' + (i + 1) + ' のお名前">' +
                '<select name="companion_' + (i + 1) + '_attend">' +
                  '<option value="出席">出席</option>' +
                  '<option value="欠席">欠席</option>' +
                '</select>';
              compList.appendChild(row);
            }
          }
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

      form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        if (!endpoint) {
          if (status) { status.textContent = '※ プレビューのため入力内容の送信はできません'; }
          return;
        }
        var fd = new FormData(form);
        var payload = {};
        fd.forEach(function (v, k) { payload[k] = v; });
        if (status) { status.textContent = '送信中…'; }
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
          setTimeout(function () { poster.remove(); iframe.remove(); }, 0);
        });
        poster.submit();
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

  /* パレット表示順（招待状の王道順 → しおり用は後ろ） */
  var order = ['cover', 'countdown', 'message', 'profile', 'album', 'partyInfo', 'request', 'rsvp',
    'photoCta', 'schedule', 'map', 'photo', 'text', 'image', 'embed'];

  function defaultStyle() {
    return { bg: 'none', align: 'center', spacing: 'normal', width: 'normal', tilt: 'none' };
  }

  WEDI.schema = {
    types: types,
    order: order,
    defaultStyle: defaultStyle
  };
})(window);
