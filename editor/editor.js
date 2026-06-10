/* ===========================================================================
 * WEDI.editor — エディター統括
 * 状態（doc / 選択中ページ・ブロック）を持ち、各モジュール
 * (inspector/palette/drag) から呼ばれる共通 API を提供する。
 * 依存: theme, render, schema, storage, i18n, seed, inspector, palette, drag
 * =========================================================================== */
(function (global) {
  'use strict';

  var WEDI = global.WEDI = global.WEDI || {};
  var R = WEDI.render;
  var T = WEDI.theme;
  var S = WEDI.schema;
  var i18n = WEDI.i18n;

  /* ---- DOM 参照 ---- */
  var canvas = document.getElementById('canvas');
  var canvasWrap = document.getElementById('canvasWrap');
  var pagesList = document.getElementById('pagesList');
  var blockList = document.getElementById('blockList');
  var paletteEl = document.getElementById('palette');
  var inspectorEl = document.getElementById('inspector');
  var saveStatus = document.getElementById('saveStatus');
  var toastEl = document.getElementById('toast');

  /* ---- 状態 ---- */
  var state = {
    doc: null,
    activePageId: null,
    selectedBlockId: null
  };

  var saveTimer = null;

  /* ---- ユーティリティ ---- */
  function uid(prefix) {
    return (prefix || 'id') + '_' + Math.random().toString(36).slice(2, 9);
  }

  function activePage() {
    if (!state.doc) { return null; }
    return state.doc.pages.filter(function (p) { return p.id === state.activePageId; })[0] || state.doc.pages[0];
  }

  function selectedBlock() {
    var page = activePage();
    if (!page) { return null; }
    return page.blocks.filter(function (b) { return b.id === state.selectedBlockId; })[0] || null;
  }

  function findFrame(blockId) {
    return canvas.querySelector('.block-frame[data-block-id="' + blockId + '"]');
  }

  /* ---- トースト ---- */
  var toastTimer = null;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('is-show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('is-show'); }, 1600);
  }

  /* ---- 保存（デバウンス自動 + 明示） ---- */
  var pendingSave = false;
  function scheduleSave() {
    saveStatus.textContent = '';
    pendingSave = true;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function () { doSave(true); }, 400);
  }

  /* タブを閉じる直前、保存待ちがあれば即時フラッシュ（編集消失防止） */
  function flushSave() {
    if (!pendingSave) { return; }
    clearTimeout(saveTimer);
    WEDI.storage.save(state.doc);
    pendingSave = false;
  }

  function doSave(silent) {
    pendingSave = false;
    var res = WEDI.storage.save(state.doc);
    if (res.ok) {
      saveStatus.textContent = silent ? i18n.t('autosaved') : i18n.t('saved');
      if (!silent) { toast(i18n.t('saved')); }
      refreshUndoButton();
    } else {
      saveStatus.textContent = i18n.t('saveFailed');
      toast(i18n.t('saveFailed'));
    }
  }

  /* ---- オーバーレイ生成（block-frame に被せる） ---- */
  function buildOverlay(block) {
    var type = S.types[block.type] || {};
    var overlay = document.createElement('div');
    overlay.className = 'block-overlay';
    overlay.innerHTML =
      '<div class="block-overlay__hit" data-role="select"></div>' +
      '<div class="block-overlay__label">' + (type.icon || '') + ' ' +
        R.esc(type.label || block.type) + '</div>' +
      '<div class="block-overlay__handle" data-role="handle" title="ドラッグで並べ替え">⠿</div>';
    return overlay;
  }

  /* ---- キャンバス全体を描画（ページ切替・並べ替え・追加削除時） ---- */
  function renderCanvas() {
    var page = activePage();
    canvas.innerHTML = '';
    T.applyTheme(canvas, state.doc.theme);

    if (!page || !page.blocks.length) {
      var empty = document.createElement('div');
      empty.style.cssText = 'padding:64px 24px;text-align:center;color:var(--muted);font-size:13px;';
      empty.textContent = i18n.t('noBlocks');
      canvas.appendChild(empty);
    } else {
      page.blocks.forEach(function (block) {
        var frame = document.createElement('div');
        frame.className = 'block-frame';
        frame.dataset.blockId = block.id;
        frame.dataset.type = block.type;
        if (block.id === state.selectedBlockId) { frame.classList.add('is-selected'); }
        frame.appendChild(R.renderBlock(block, state.doc.theme));
        frame.appendChild(buildOverlay(block));
        canvas.appendChild(frame);
      });
    }
    renderBlockList();
  }

  /* ---- 1 ブロックだけ差分再描画（フィールド編集時） ---- */
  function rerenderBlock(blockId) {
    var page = activePage();
    var block = page.blocks.filter(function (b) { return b.id === blockId; })[0];
    var frame = findFrame(blockId);
    if (!block || !frame) { renderCanvas(); return; }
    var rendered = R.renderBlock(block, state.doc.theme);
    var oldRendered = frame.querySelector('.wb-block');
    if (oldRendered) {
      frame.replaceChild(rendered, oldRendered);
    } else {
      frame.insertBefore(rendered, frame.firstChild);
    }
    renderBlockList();
  }

  /* ---- 左の「ブロック概要」一覧 ---- */
  function renderBlockList() {
    var page = activePage();
    blockList.innerHTML = '';
    if (!page || !page.blocks.length) {
      var e = document.createElement('div');
      e.className = 'ed-blocklist__empty';
      e.textContent = i18n.t('noBlocks');
      blockList.appendChild(e);
      return;
    }
    page.blocks.forEach(function (block) {
      var type = S.types[block.type] || {};
      var item = document.createElement('div');
      item.className = 'ed-blocklist__item' + (block.id === state.selectedBlockId ? ' is-active' : '');
      item.dataset.blockId = block.id;
      item.innerHTML =
        '<span class="ed-blocklist__icon">' + (type.icon || '▫') + '</span>' +
        '<span>' + R.esc(type.label || block.type) + '</span>';
      item.addEventListener('click', function () { selectBlock(block.id, true); });
      blockList.appendChild(item);
    });
  }

  /* ---- ページ一覧 ---- */
  function renderPagesList() {
    pagesList.innerHTML = '';
    state.doc.pages.forEach(function (page) {
      var item = document.createElement('div');
      item.className = 'ed-page-item' + (page.id === state.activePageId ? ' is-active' : '');
      item.dataset.pageId = page.id;

      var name = document.createElement('span');
      name.className = 'ed-page-item__name';
      name.textContent = page.name || i18n.t('newPageName');
      name.title = 'ダブルクリックで名前を変更';
      name.addEventListener('dblclick', function () {
        name.contentEditable = 'true';
        name.focus();
        document.execCommand && document.getSelection().selectAllChildren(name);
      });
      name.addEventListener('blur', function () {
        name.contentEditable = 'false';
        page.name = name.textContent.trim() || i18n.t('newPageName');
        name.textContent = page.name;
        scheduleSave();
      });
      name.addEventListener('keydown', function (ev) {
        if (ev.key === 'Enter') { ev.preventDefault(); name.blur(); }
      });

      item.appendChild(name);

      if (state.doc.pages.length > 1) {
        var del = document.createElement('button');
        del.className = 'ed-btn ed-btn--danger ed-btn--sm';
        del.textContent = '×';
        del.title = i18n.t('deletePage');
        del.addEventListener('click', function (ev) {
          ev.stopPropagation();
          deletePage(page.id);
        });
        item.appendChild(del);
      }

      item.addEventListener('click', function () { switchPage(page.id); });
      pagesList.appendChild(item);
    });
  }

  /* ---- アクション ---- */
  function selectBlock(blockId, scroll) {
    state.selectedBlockId = blockId;
    // フレームの選択状態を更新
    canvas.querySelectorAll('.block-frame').forEach(function (f) {
      f.classList.toggle('is-selected', f.dataset.blockId === blockId);
    });
    renderBlockList();
    WEDI.inspector.render(selectedBlock());
    if (scroll) {
      var frame = findFrame(blockId);
      if (frame) { frame.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
    }
  }

  function deselect() {
    state.selectedBlockId = null;
    canvas.querySelectorAll('.block-frame.is-selected').forEach(function (f) {
      f.classList.remove('is-selected');
    });
    renderBlockList();
    WEDI.inspector.render(null);
  }

  function switchPage(pageId) {
    if (pageId === state.activePageId) { return; }
    state.activePageId = pageId;
    state.selectedBlockId = null;
    renderPagesList();
    renderCanvas();
    WEDI.inspector.render(null);
    canvasWrap.scrollTop = 0;
  }

  function addPage() {
    var page = { id: uid('pg'), name: i18n.t('newPageName'), slug: uid('p'), blocks: [] };
    state.doc.pages.push(page);
    state.activePageId = page.id;
    state.selectedBlockId = null;
    renderPagesList();
    renderCanvas();
    WEDI.inspector.render(null);
    scheduleSave();
  }

  function deletePage(pageId) {
    if (state.doc.pages.length <= 1) { toast(i18n.t('cannotDeleteLastPage')); return; }
    if (!global.confirm(i18n.t('deletePageConfirm'))) { return; }
    state.doc.pages = state.doc.pages.filter(function (p) { return p.id !== pageId; });
    if (state.activePageId === pageId) {
      state.activePageId = state.doc.pages[0].id;
      state.selectedBlockId = null;
    }
    renderPagesList();
    renderCanvas();
    WEDI.inspector.render(null);
    doSave(false);
  }

  function addBlock(type) {
    var def = S.types[type];
    if (!def) { return; }
    var page = activePage();
    var block = {
      id: uid('bk'),
      type: type,
      data: T.clone(def.defaultData),
      style: S.defaultStyle()
    };
    // 選択中ブロックの直後、なければ末尾
    var idx = page.blocks.length;
    if (state.selectedBlockId) {
      var si = page.blocks.map(function (b) { return b.id; }).indexOf(state.selectedBlockId);
      if (si >= 0) { idx = si + 1; }
    }
    page.blocks.splice(idx, 0, block);
    renderCanvas();
    selectBlock(block.id, true);
    scheduleSave();
  }

  function deleteBlock(blockId) {
    if (!global.confirm(i18n.t('deleteBlockConfirm'))) { return; }
    var page = activePage();
    page.blocks = page.blocks.filter(function (b) { return b.id !== blockId; });
    if (state.selectedBlockId === blockId) { state.selectedBlockId = null; }
    renderCanvas();
    WEDI.inspector.render(null);
    doSave(false);
  }

  function duplicateBlock(blockId) {
    var page = activePage();
    var idx = page.blocks.map(function (b) { return b.id; }).indexOf(blockId);
    if (idx < 0) { return; }
    var copy = T.clone(page.blocks[idx]);
    copy.id = uid('bk');
    page.blocks.splice(idx + 1, 0, copy);
    renderCanvas();
    selectBlock(copy.id, true);
    scheduleSave();
  }

  /* ブロックの順序を変更（drag.js から呼ばれる） */
  function moveBlock(blockId, toIndex) {
    var page = activePage();
    var from = page.blocks.map(function (b) { return b.id; }).indexOf(blockId);
    if (from < 0) { return; }
    var block = page.blocks.splice(from, 1)[0];
    if (toIndex > from) { toIndex--; }
    toIndex = Math.max(0, Math.min(toIndex, page.blocks.length));
    page.blocks.splice(toIndex, 0, block);
    renderCanvas();
    selectBlock(blockId, false);
    scheduleSave();
  }

  /* data / style 更新（inspector から呼ばれる） */
  function updateBlockData(blockId, key, value) {
    var page = activePage();
    var block = page.blocks.filter(function (b) { return b.id === blockId; })[0];
    if (!block) { return; }
    block.data[key] = value;
    rerenderBlock(blockId);
    scheduleSave();
  }

  function updateBlockStyle(blockId, key, value) {
    var page = activePage();
    var block = page.blocks.filter(function (b) { return b.id === blockId; })[0];
    if (!block) { return; }
    if (!block.style) { block.style = S.defaultStyle(); }
    block.style[key] = value;
    rerenderBlock(blockId);
    scheduleSave();
  }

  function setThemeColor(tokenKey, value) {
    state.doc.theme.colors[tokenKey] = value;
    T.applyTheme(canvas, state.doc.theme);
    scheduleSave();
  }

  /* ---- プレビュー切替 ---- */
  var isPreview = false;
  var previewButton = document.getElementById('previewButton');
  function togglePreview() {
    isPreview = !isPreview;
    document.body.classList.toggle('is-preview', isPreview);
    canvas.classList.toggle('is-editing', !isPreview);
    previewButton.textContent = isPreview ? i18n.t('editMode') : i18n.t('preview');
    if (isPreview) {
      // 挙動を有効化（フォーム送信など）
      canvas.querySelectorAll('.block-frame').forEach(function (frame) {
        var page = activePage();
        var block = page.blocks.filter(function (b) { return b.id === frame.dataset.blockId; })[0];
        if (block) { R.hydrate(frame, block); }
      });
    } else {
      // 編集に戻る → 描き直してフォーム状態リセット
      renderCanvas();
      if (state.selectedBlockId) { selectBlock(state.selectedBlockId, false); }
    }
  }

  function refreshUndoButton() {
    var btn = document.getElementById('undoButton');
    btn.disabled = !WEDI.storage.hasBackup();
  }

  function doUndo() {
    var restored = WEDI.storage.undo();
    if (!restored) { toast(i18n.t('nothingToUndo')); return; }
    state.doc = restored;
    if (!activePage()) { state.activePageId = state.doc.pages[0].id; }
    state.selectedBlockId = null;
    renderPagesList();
    renderCanvas();
    WEDI.inspector.render(null);
    refreshUndoButton();
    toast(i18n.t('undone'));
  }

  /* ---- キャンバスのクリック委譲（選択） ---- */
  canvas.addEventListener('click', function (ev) {
    if (isPreview) { return; }
    var hit = ev.target.closest('[data-role="select"]');
    if (hit) {
      var frame = hit.closest('.block-frame');
      if (frame) { selectBlock(frame.dataset.blockId, false); }
      return;
    }
    // 余白クリックで選択解除
    if (ev.target === canvas) { deselect(); }
  });

  /* ---- 公開 API（他モジュール用） ---- */
  WEDI.editor = {
    state: state,
    activePage: activePage,
    selectedBlock: selectedBlock,
    uid: uid,
    addBlock: addBlock,
    deleteBlock: deleteBlock,
    duplicateBlock: duplicateBlock,
    moveBlock: moveBlock,
    selectBlock: selectBlock,
    updateBlockData: updateBlockData,
    updateBlockStyle: updateBlockStyle,
    setThemeColor: setThemeColor,
    rerenderBlock: rerenderBlock,
    renderCanvas: renderCanvas,
    findFrame: findFrame,
    scheduleSave: scheduleSave,
    toast: toast
  };

  /* ---- 初期化 ---- */
  function init() {
    document.getElementById('appTitle').textContent = i18n.t('appTitle');

    var loaded = WEDI.storage.load();
    state.doc = loaded || WEDI.theme.clone(WEDI.seed);
    if (!state.doc.theme) { state.doc.theme = WEDI.theme.clone(WEDI.theme.DEFAULT); }
    state.activePageId = state.doc.pages[0].id;

    WEDI.palette.render(paletteEl, addBlock);
    renderPagesList();
    renderCanvas();
    WEDI.inspector.render(null);
    refreshUndoButton();

    if (!loaded) { doSave(true); }  // 初回 seed を保存

    // ドラッグ初期化
    WEDI.drag.init(canvas, {
      getOrder: function () { return activePage().blocks.map(function (b) { return b.id; }); },
      onDrop: moveBlock
    });

    // トップバー
    document.getElementById('saveButton').addEventListener('click', function () { doSave(false); });
    document.getElementById('addPageButton').addEventListener('click', addPage);
    previewButton.addEventListener('click', togglePreview);
    document.getElementById('undoButton').addEventListener('click', doUndo);

    // タブを閉じる/離れる直前に保存待ちをフラッシュ
    global.addEventListener('beforeunload', flushSave);
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') { flushSave(); }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window);
