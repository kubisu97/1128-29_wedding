/* ===========================================================================
 * WEDI.upload — 画像アップロード（Supabase Storage）
 * エディターでファイルを選ぶ → ここでアップロード → 公開URLを返す。
 * supabase-js (window.supabase) が読み込まれていれば有効。無ければ無効化。
 * 設定は旧サイト(_legacy/admin.js)の値を再利用。
 * =========================================================================== */
(function (global) {
  'use strict';

  var WEDI = global.WEDI = global.WEDI || {};

  /* 旧サイトと同じ設定（必要なら差し替え） */
  var CONFIG = {
    url: 'https://xkgxocdeunfowivmxyxn.supabase.co',
    anonKey: 'sb_publishable_i3GaR312Iu2bPWP86-Qkbg_EDqgwYfI',
    bucket: 'wedi-assets',
    prefix: 'kyoto-family-wedding-2026'
  };

  var client = null;
  function getClient() {
    if (client) { return client; }
    if (global.supabase && CONFIG.url && CONFIG.anonKey) {
      client = global.supabase.createClient(CONFIG.url, CONFIG.anonKey);
    }
    return client;
  }

  function isConfigured() {
    return !!getClient();
  }

  /* ファイルをアップロードして公開URLを返す（Promise<string>）。
   * folder: 保存先サブフォルダ（例 'cover', 'album'）。省略可。 */
  function uploadFile(file, folder) {
    return new Promise(function (resolve, reject) {
      var c = getClient();
      if (!c) { reject(new Error('Supabase未設定')); return; }
      if (!file) { reject(new Error('ファイルがありません')); return; }
      // 画像のみ許可
      if (!/^image\//.test(file.type)) { reject(new Error('画像ファイルを選んでください')); return; }
      // 10MB 上限（安全側）
      if (file.size > 10 * 1024 * 1024) { reject(new Error('画像は10MBまでです')); return; }

      var ext = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '');
      var rand = Math.random().toString(36).slice(2, 10);
      var stamp = Date.now ? Date.now() : new Date().getTime();
      var name = stamp + '-' + rand + '.' + (ext || 'jpg');
      var pathParts = [CONFIG.prefix];
      if (folder) { pathParts.push(String(folder).replace(/[^\w-]/g, '')); }
      pathParts.push(name);
      var filePath = pathParts.join('/');

      c.storage.from(CONFIG.bucket)
        .upload(filePath, file, { upsert: true, contentType: file.type })
        .then(function (res) {
          if (res.error) { reject(res.error); return; }
          var pub = c.storage.from(CONFIG.bucket).getPublicUrl(filePath);
          var url = pub && pub.data && pub.data.publicUrl;
          if (url) { resolve(url); } else { reject(new Error('URL取得に失敗')); }
        })
        .catch(reject);
    });
  }

  WEDI.upload = {
    CONFIG: CONFIG,
    isConfigured: isConfigured,
    uploadFile: uploadFile
  };
})(window);
