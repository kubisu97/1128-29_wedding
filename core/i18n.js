/* ===========================================================================
 * WEDI.i18n — エディター UI 文言の単一ソース（日本語）
 * ブロックの「中身」はユーザーのコピーなので対象外。UI chrome だけここ。
 * 将来 EN 切替したくなってもロジックに触れず済む。
 * =========================================================================== */
(function (global) {
  'use strict';

  var WEDI = global.WEDI = global.WEDI || {};

  var STRINGS = {
    appTitle: 'しおりエディター',
    pages: 'ページ',
    addPage: '＋ ページを追加',
    newPageName: '新しいページ',
    deletePage: 'このページを削除',
    deletePageConfirm: 'このページを削除しますか？元に戻せません。',
    cannotDeleteLastPage: '最後のページは削除できません。',
    renamePage: 'ページ名',

    blocks: 'ブロック',
    addBlock: 'ブロックを追加',
    palette: 'パーツ',
    noBlocks: 'まだブロックがありません。下の「パーツ」から追加してください。',

    inspector: '設定',
    noSelection: 'ブロックを選ぶと、ここで編集できます。',
    deleteBlock: 'このブロックを削除',
    deleteBlockConfirm: 'このブロックを削除しますか？',
    moveUp: '上へ',
    moveDown: '下へ',
    duplicate: '複製',

    styleSection: '見た目',
    styleBg: '背景',
    styleAlign: '文字寄せ',
    styleSpacing: '余白',
    styleWidth: '幅',
    styleTilt: '傾き',

    theme: 'テーマ全体',
    themeColors: '配色',
    themeFonts: 'フォント',
    themeRadius: '角丸',

    save: '保存',
    saved: '保存しました',
    saving: '保存中…',
    saveFailed: '保存に失敗しました',
    autosaved: '自動保存済み',
    undo: '元に戻す',
    undone: '元に戻しました',
    nothingToUndo: '戻せる変更がありません',

    preview: 'プレビュー',
    editMode: '編集に戻る',
    openFront: 'フロントを開く',

    addItem: '＋ 追加',
    removeItem: '削除',
    item: '項目',

    imageUrlPlaceholder: '画像URLを貼り付け',
    noImage: '画像なし',

    /* style enum のラベル */
    bg: {
      none: 'なし', paper: '白', pink: 'ピンク', pinkSoft: '薄ピンク',
      sage: 'セージ', sageSoft: '薄セージ', coral: 'コーラル', ink: 'ダーク'
    },
    align: { left: '左', center: '中央', right: '右' },
    spacing: { tight: '狭い', normal: '標準', roomy: '広い' },
    width: { narrow: '狭い', normal: '標準', wide: '広い' },
    tilt: { none: 'なし', left: '左に傾ける', right: '右に傾ける' }
  };

  /* キー取得（"bg.sage" のようなドット記法対応） */
  function t(key) {
    var parts = String(key).split('.');
    var cur = STRINGS;
    for (var i = 0; i < parts.length; i++) {
      if (cur == null) { return key; }
      cur = cur[parts[i]];
    }
    return cur == null ? key : cur;
  }

  WEDI.i18n = { t: t, strings: STRINGS };
})(window);
