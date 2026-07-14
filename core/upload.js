/* ===========================================================================
 * WEDI.upload — 画像アップロード（Cloudflare R2 経由）
 * エディター/RSVP でファイルを選ぶ → /api/upload に POST → 公開URLを返す。
 * サーバー側は functions/api/upload.js（Pages Functions + R2 バインディング）。
 * =========================================================================== */
(function (global) {
  'use strict';

  var WEDI = global.WEDI = global.WEDI || {};

  var ENDPOINT = '/api/upload';

  /* アップロード機能が使えるか。
   * Pages Functions 上（本番）でのみ動くため、http(s) の同一オリジンなら有効とみなす。
   * file:// で直接開いた場合などは無効。 */
  function isConfigured() {
    return /^https?:$/.test(global.location.protocol);
  }

  /* ファイルをアップロードして公開URLを返す（Promise<string>）。
   * folder: 保存先サブフォルダ（例 'cover', 'rsvp-photos'）。省略可。 */
  function uploadFile(file, folder) {
    return new Promise(function (resolve, reject) {
      if (!file) { reject(new Error('ファイルがありません')); return; }
      if (!/^image\//.test(file.type)) { reject(new Error('画像ファイルを選んでください')); return; }
      if (file.size > 10 * 1024 * 1024) { reject(new Error('画像は10MBまでです')); return; }

      var fd = new FormData();
      fd.append('file', file);
      if (folder) { fd.append('folder', folder); }

      fetch(ENDPOINT, { method: 'POST', body: fd })
        .then(function (res) {
          return res.json().then(function (data) {
            if (!res.ok) { throw new Error((data && data.error) || ('HTTP ' + res.status)); }
            return data;
          });
        })
        .then(function (data) {
          if (data && data.url) { resolve(data.url); }
          else { reject(new Error('URL取得に失敗')); }
        })
        .catch(function (err) {
          reject(err instanceof Error ? err : new Error(String(err)));
        });
    });
  }

  WEDI.upload = {
    isConfigured: isConfigured,
    uploadFile: uploadFile
  };
})(window);
