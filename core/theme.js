/* ===========================================================================
 * WEDI.theme — デザイントークンの単一ソース（Favori 調）
 * フロント(index.html)・エディター(editor.html) の両方が読み込む。
 * applyTheme() が doc.theme の値を CSS カスタムプロパティとしてルートに書き込む。
 * 出典: sample/ のスクショ + DESIGN.md のトークン（coral #ec775b / Noto Sans JP 等）
 * =========================================================================== */
(function (global) {
  'use strict';

  var WEDI = global.WEDI = global.WEDI || {};

  /* Favori の配色（DESIGN.md と sample スクショを突き合わせた値） */
  var DEFAULT_THEME = {
    colors: {
      pink: '#ecd9d1',       // ダスティピンク（カバー/RSVP 背景）
      pinkSoft: '#f5e9e4',   // 薄いピンク
      coral: '#ec775b',      // コーラル/テラコッタ（アクセント・ボタン・見出しライン）
      sage: '#c6cec9',       // セージグレー（PC 外側背景・一部カード）
      sageSoft: '#dde2de',   // 薄いセージ（情報カード背景）
      ink: '#333333',        // 本文
      muted: '#9c9c9c',      // 補足テキスト
      paper: '#ffffff',      // カード/紙
      line: '#d9d9d9'        // 罫線
    },
    fonts: {
      pair: 'favori'
    },
    radius: '8px',
    sectionPad: '64px'
  };

  /* フォントペア（DESIGN.md: 本文 Noto Sans JP。見出しは明朝系で品を出す） */
  var FONT_PAIRS = {
    'favori': {
      label: 'Favori（ゴシック本文 × 明朝見出し）',
      body: "'Noto Sans JP', sans-serif",
      display: "'Noto Serif JP', serif",
      accent: "'Poppins', sans-serif"
    },
    'serif-classic': {
      label: 'クラシック（明朝 × Didot）',
      body: "'Noto Serif JP', serif",
      display: "'GFS Didot', serif",
      accent: "'Poppins', sans-serif"
    },
    'sans-soft': {
      label: 'やわらか（ゴシック × Poppins）',
      body: "'Noto Sans JP', sans-serif",
      display: "'Poppins', sans-serif",
      accent: "'Poppins', sans-serif"
    }
  };

  /* 背景プリセット（block.style.bg の enum → トークン名） */
  var BG_PRESETS = ['none', 'paper', 'pink', 'pinkSoft', 'sage', 'sageSoft', 'coral', 'ink'];

  function cssVarName(key) {
    return '--' + key.replace(/[A-Z]/g, function (m) { return '-' + m.toLowerCase(); });
  }

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function normalize(theme) {
    var t = clone(DEFAULT_THEME);
    if (!theme) { return t; }
    if (theme.colors) {
      Object.keys(t.colors).forEach(function (k) {
        if (theme.colors[k]) { t.colors[k] = theme.colors[k]; }
      });
    }
    if (theme.fonts && theme.fonts.pair && FONT_PAIRS[theme.fonts.pair]) {
      t.fonts.pair = theme.fonts.pair;
    }
    if (theme.radius) { t.radius = theme.radius; }
    if (theme.sectionPad) { t.sectionPad = theme.sectionPad; }
    return t;
  }

  function applyTheme(root, theme) {
    if (!root) { return; }
    var t = normalize(theme);
    var s = root.style;

    Object.keys(t.colors).forEach(function (k) {
      s.setProperty(cssVarName(k), t.colors[k]);
    });

    var pair = FONT_PAIRS[t.fonts.pair] || FONT_PAIRS['favori'];
    s.setProperty('--font-body', pair.body);
    s.setProperty('--font-display', pair.display);
    s.setProperty('--font-accent', pair.accent);

    s.setProperty('--radius', t.radius);
    s.setProperty('--section-pad', t.sectionPad);
  }

  WEDI.theme = {
    DEFAULT: DEFAULT_THEME,
    FONT_PAIRS: FONT_PAIRS,
    BG_PRESETS: BG_PRESETS,
    applyTheme: applyTheme,
    normalize: normalize,
    clone: clone
  };
})(window);
