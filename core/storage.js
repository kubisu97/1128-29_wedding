/* ===========================================================================
 * WEDI.storage — 永続化アダプタ
 * v1: localStorage。後で Supabase に差し替えられるよう save/load の形を固定。
 * 誤削除対策に保存毎の 5 世代リングバッファ + undo() を持つ。
 * =========================================================================== */
(function (global) {
  'use strict';

  var WEDI = global.WEDI = global.WEDI || {};

  var KEY = 'wedi-doc';
  var BAK_PREFIX = 'wedi-doc-bak-';
  var BAK_COUNT = 5;

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function safeParse(str) {
    try { return JSON.parse(str); } catch (e) { return null; }
  }

  /* 現在の doc を読む（無ければ null） */
  function load() {
    var raw = global.localStorage.getItem(KEY);
    return raw ? safeParse(raw) : null;
  }

  /* リングバッファに現状を退避してから保存 */
  function save(doc) {
    try {
      // 直前の状態をバックアップへローテーション
      var prev = global.localStorage.getItem(KEY);
      if (prev != null) {
        for (var i = BAK_COUNT - 1; i > 0; i--) {
          var older = global.localStorage.getItem(BAK_PREFIX + (i - 1));
          if (older != null) {
            global.localStorage.setItem(BAK_PREFIX + i, older);
          }
        }
        global.localStorage.setItem(BAK_PREFIX + 0, prev);
      }
      global.localStorage.setItem(KEY, JSON.stringify(doc));
      return { ok: true };
    } catch (e) {
      // 容量超過など
      return { ok: false, error: e };
    }
  }

  /* 直前のバックアップを復元して返す（無ければ null） */
  function undo() {
    var bak0 = global.localStorage.getItem(BAK_PREFIX + 0);
    if (bak0 == null) { return null; }
    var restored = safeParse(bak0);
    if (!restored) { return null; }
    // バックアップを 1 つ繰り上げ、現在へ戻す
    global.localStorage.setItem(KEY, bak0);
    for (var i = 0; i < BAK_COUNT - 1; i++) {
      var next = global.localStorage.getItem(BAK_PREFIX + (i + 1));
      if (next != null) {
        global.localStorage.setItem(BAK_PREFIX + i, next);
      } else {
        global.localStorage.removeItem(BAK_PREFIX + i);
      }
    }
    global.localStorage.removeItem(BAK_PREFIX + (BAK_COUNT - 1));
    return restored;
  }

  function hasBackup() {
    return global.localStorage.getItem(BAK_PREFIX + 0) != null;
  }

  /* localStorage の doc と seed のうち updatedAt が新しい方を返す。
   * どちらにも updatedAt が無い場合は従来通り stored を優先。
   * （書き出し→deploy した seed が、古い localStorage に隠されるのを防ぐ） */
  function pickNewer(stored, seed) {
    if (!stored) { return seed || null; }
    if (!seed) { return stored; }
    var a = Number(stored.updatedAt) || 0;
    var b = Number(seed.updatedAt) || 0;
    return b > a ? seed : stored;
  }

  WEDI.storage = {
    load: load,
    save: save,
    undo: undo,
    hasBackup: hasBackup,
    pickNewer: pickNewer,
    clone: clone
  };
})(window);
