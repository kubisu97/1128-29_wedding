/* ===========================================================================
 * WEDI.render — 共有レンダラー
 * フロントとエディターが同一の renderBlock を使う＝「見たままが本番」。
 * renderBlock は不活性なマークアップだけ返す（純粋）。
 * 挙動（リスナ・送信）は hydrate() が別途付ける。
 * =========================================================================== */
(function (global) {
  'use strict';

  var WEDI = global.WEDI = global.WEDI || {};

  /* ---- 安全ヘルパー（全ユーザーテキストはここを通す） ---- */

  function esc(value) {
    if (value == null) { return ''; }
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* 改行を <br> に（エスケープ後） */
  function escMultiline(value) {
    return esc(value).replace(/\r?\n/g, '<br>');
  }

  /* http(s) と同一オリジンの相対パスのみ許可。javascript: data: 等は弾く（XSS対策） */
  function safeUrl(value) {
    if (!value) { return ''; }
    var v = String(value).trim();
    if (/^https?:\/\//i.test(v)) { return v; }
    // 危険なスキームを拒否（javascript:, data:, vbscript: など）
    if (/^[a-z][a-z0-9+.-]*:/i.test(v)) { return ''; }
    // 同一オリジンの相対/ルート相対パス（assets/x.png, /img/x.png, ./x.png 等）は許可
    if (/^(\.{0,2}\/|[\w.-]+\/|[\w.-]+\.(png|jpe?g|gif|webp|svg|avif))/i.test(v)) { return v; }
    return '';
  }

  /* Google Maps の埋め込み URL に限定 */
  function safeMapEmbed(value) {
    var v = safeUrl(value);
    if (!v) { return ''; }
    try {
      var host = new URL(v).hostname;
      if (/(^|\.)google\.[a-z.]+$/i.test(host) ||
          /(^|\.)google\.com$/i.test(host) ||
          /(^|\.)maps\.google\./i.test(host)) {
        return v;
      }
    } catch (e) { /* ignore */ }
    return '';
  }

  /* ---- style プリセット → クラス ---- */

  function styleClasses(style) {
    var s = style || {};
    var cls = [];
    cls.push('wb-bg--' + (s.bg || 'none'));
    cls.push('wb-align--' + (s.align || 'center'));
    cls.push('wb-space--' + (s.spacing || 'normal'));
    cls.push('wb-w--' + (s.width || 'normal'));
    cls.push('wb-tilt--' + (s.tilt || 'none'));
    return cls.join(' ');
  }

  /* ---- ブロック描画 ---- */

  /* 1 ブロックを純粋な DOM にする（イベント無し） */
  function renderBlock(block, theme) {
    var type = WEDI.schema && WEDI.schema.types[block.type];
    var inner;
    if (type && typeof type.render === 'function') {
      inner = type.render(block, theme);
    } else {
      // 未知タイプのフォールバック
      inner = document.createElement('div');
      inner.className = 'wb-unknown';
      inner.textContent = '未対応のブロック: ' + block.type;
    }

    // 共通の section ラッパ。style プリセットはここに当てる。
    var section = document.createElement('section');
    section.className = 'wb-block ' + styleClasses(block.style);
    section.dataset.type = block.type;

    var inner2 = document.createElement('div');
    inner2.className = 'wb-block__inner';
    inner2.appendChild(inner);
    section.appendChild(inner2);
    return section;
  }

  /* 1 ページ分の DOM 断片（DocumentFragment）を返す。
   * editor=true の場合は各ブロックを .block-frame で包む（オーバーレイ用）。 */
  function renderPage(page, theme, options) {
    options = options || {};
    var editor = !!options.editor;
    var frag = document.createDocumentFragment();
    (page.blocks || []).forEach(function (block) {
      var rendered = renderBlock(block, theme);
      if (editor) {
        var frame = document.createElement('div');
        frame.className = 'block-frame';
        frame.dataset.blockId = block.id;
        frame.dataset.type = block.type;
        frame.appendChild(rendered);
        frag.appendChild(frame);
      } else {
        frag.appendChild(rendered);
      }
    });
    return frag;
  }

  /* ---- hydrate：挙動の後付け ---- */
  /* 描画済みの frame（または rendered section）に対し、対話を有効化する。
   * フロントは常に呼ぶ／エディターはプレビュー時のみ呼ぶ（is-editing 中は呼ばない）。 */
  function hydrate(root, block) {
    var type = WEDI.schema && WEDI.schema.types[block.type];
    if (type && typeof type.hydrate === 'function') {
      type.hydrate(root, block);
    }
  }

  WEDI.render = {
    renderBlock: renderBlock,
    renderPage: renderPage,
    hydrate: hydrate,
    esc: esc,
    escMultiline: escMultiline,
    safeUrl: safeUrl,
    safeMapEmbed: safeMapEmbed,
    styleClasses: styleClasses
  };
})(window);
