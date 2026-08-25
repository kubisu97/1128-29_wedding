/* ===========================================================================
 * WEDI.upload — 画像アップロード（Cloudflare KV 経由）
 * エディター/RSVP でファイルを選ぶ → /api/upload に POST → 公開URLを返す。
 * サーバー側は functions/api/upload.js（Pages Functions + KV バインディング）。
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
          /* 本文を先にテキストで受ける。
           * Functions が未デプロイだと Pages が 405 や HTML を返し、
           * いきなり res.json() すると「Unexpected end of JSON input」に
           * すり替わって原因が見えなくなるため。 */
          return res.text().then(function (text) {
            var data = null;
            if (text) { try { data = JSON.parse(text); } catch (e) { /* JSON以外 */ } }

            if (!res.ok) {
              throw new Error((data && data.error) || ('HTTP ' + res.status + ' ' + (res.statusText || '')).trim());
            }
            if (!data) {
              throw new Error('サーバーが想定外の応答を返しました（アップロード機能が配置されていない可能性があります）');
            }
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
