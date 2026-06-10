/* ===========================================================================
 * WEDI.drag — pointer-events によるブロック並べ替え（同一ページ内）
 * ハンドル(.block-overlay__handle / [data-role="handle"])を掴んでドラッグ。
 * 移動中は splice せずドロップ線だけ出し、pointerup で onDrop(blockId, toIndex)。
 * 依存: なし（DOM 操作のみ）
 * =========================================================================== */
(function (global) {
  'use strict';

  var WEDI = global.WEDI = global.WEDI || {};

  function init(canvas, opts) {
    var onDrop = opts.onDrop;
    var wrap = canvas.closest('.ed-canvas-wrap') || canvas.parentNode;

    var dragging = null;     // { id, frame }
    var indicator = null;    // ドロップ線要素
    var targetIndex = -1;    // 挿入先 index
    var autoScrollTimer = null;

    function frames() {
      return Array.prototype.slice.call(canvas.querySelectorAll('.block-frame'));
    }

    function makeIndicator() {
      var el = document.createElement('div');
      el.className = 'ed-drop-indicator';
      return el;
    }

    /* pointer Y から挿入位置を決め、ドロップ線を差し込む */
    function updateIndicator(clientY) {
      var fs = frames().filter(function (f) { return f !== dragging.frame; });
      var idx = fs.length;  // 既定は末尾
      for (var i = 0; i < fs.length; i++) {
        var r = fs[i].getBoundingClientRect();
        if (clientY < r.top + r.height / 2) { idx = i; break; }
      }
      // 実 index（dragging を除いた配列上の idx）→ 元配列上の挿入 index へ
      // onDrop 側で dragging を抜いてから挿入するので、ここでは「見た目の順序」で OK
      targetIndex = idx;

      if (!indicator) { indicator = makeIndicator(); }
      if (idx >= fs.length) {
        canvas.appendChild(indicator);
      } else {
        canvas.insertBefore(indicator, fs[idx]);
      }
    }

    /* 端での自動スクロール */
    function maybeAutoScroll(clientY) {
      var r = wrap.getBoundingClientRect();
      var margin = 60;
      var speed = 0;
      if (clientY < r.top + margin) { speed = -10; }
      else if (clientY > r.bottom - margin) { speed = 10; }

      clearInterval(autoScrollTimer);
      if (speed !== 0) {
        autoScrollTimer = setInterval(function () { wrap.scrollTop += speed; }, 16);
      }
    }

    function onMove(ev) {
      if (!dragging) { return; }
      ev.preventDefault();
      updateIndicator(ev.clientY);
      maybeAutoScroll(ev.clientY);
    }

    function cleanup() {
      clearInterval(autoScrollTimer);
      autoScrollTimer = null;
      if (indicator && indicator.parentNode) { indicator.parentNode.removeChild(indicator); }
      indicator = null;
      if (dragging && dragging.frame) { dragging.frame.classList.remove('is-dragging'); }
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointercancel', onUp);
    }

    function onUp() {
      if (!dragging) { return; }
      var id = dragging.id;
      var ti = targetIndex;
      var hadIndicator = !!indicator;
      cleanup();
      dragging = null;
      targetIndex = -1;
      if (hadIndicator && ti >= 0 && typeof onDrop === 'function') {
        // targetIndex は「dragging を除いた並び」での挿入位置。
        // onDrop(moveBlock) は元配列で from を抜いてから補正するため、
        // ここでは「除外済み配列上の index を、元配列上の index に変換」する。
        var order = opts.getOrder ? opts.getOrder() : [];
        var from = order.indexOf(id);
        var insertAt = ti;
        if (from >= 0 && from <= ti) { insertAt = ti + 1; } // 自分より後ろなら +1
        onDrop(id, insertAt);
      }
    }

    /* ハンドルで pointerdown → ドラッグ開始 */
    canvas.addEventListener('pointerdown', function (ev) {
      var handle = ev.target.closest('[data-role="handle"]');
      if (!handle) { return; }
      var frame = handle.closest('.block-frame');
      if (!frame) { return; }
      ev.preventDefault();
      dragging = { id: frame.dataset.blockId, frame: frame };
      frame.classList.add('is-dragging');
      targetIndex = -1;
      document.addEventListener('pointermove', onMove);
      document.addEventListener('pointerup', onUp);
      document.addEventListener('pointercancel', onUp);
    });
  }

  WEDI.drag = { init: init };
})(window);
