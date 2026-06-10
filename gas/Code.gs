/* ===========================================================================
 * Google Apps Script — RSVP回答をスプレッドシートに保存する Web アプリ
 *
 * 【セットアップ手順】RSVP_SETUP.md を参照。要点だけ:
 *  1. 保存先のGoogleスプレッドシートを開く
 *  2. 拡張機能 → Apps Script を開き、このコードを全部貼り付け
 *  3. デプロイ → 新しいデプロイ → 種類「ウェブアプリ」
 *     - 実行ユーザー: 自分
 *     - アクセスできるユーザー: 全員
 *  4. 発行された Web アプリ URL を、エディターの RSVP ブロック
 *     「送信先URL（GAS）」に貼り付ける
 * =========================================================================== */

// 任意: シート名（既定は最初のシート）。変えたいときだけ書き換え。
var SHEET_NAME = '';

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000); // 同時送信の取りこぼし防止
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = SHEET_NAME ? ss.getSheetByName(SHEET_NAME) : ss.getSheets()[0];
    if (!sheet) { sheet = ss.insertSheet(); }

    var params = (e && e.parameter) ? e.parameter : {};

    // 同席者を1セルにまとめる（companion_1_name / companion_1_attend ...）
    var companions = [];
    var count = parseInt(params.companion_count, 10) || 0;
    for (var i = 1; i <= count; i++) {
      var nm = params['companion_' + i + '_name'] || '';
      var at = params['companion_' + i + '_attend'] || '';
      if (nm || at) { companions.push(nm + '（' + at + '）'); }
    }

    // 列の順番（ヘッダーと一致させる）
    var headers = [
      '受信日時', '挙式', '披露宴', 'ゲスト区分',
      '姓', '名', '姓(ローマ字)', '名(ローマ字)', '間柄',
      '郵便番号', '住所1', '住所2', '住所3', '電話', 'メール',
      'アレルギー', 'アレルギー内容',
      '同席者人数', '同席者', 'メッセージ', '送迎バス'
    ];

    // ヘッダーが無ければ1行目に作成
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
    }

    var row = [
      new Date(),
      params.attend_ceremony || '',
      params.attend_reception || '',
      params.guest_side || '',
      params.name1 || '',
      params.name2 || '',
      params.name_roma1 || '',
      params.name_roma2 || '',
      params.relation || '',
      params.zip || '',
      params.address1 || '',
      params.address2 || '',
      params.address3 || '',
      params.tel || '',
      params.email || '',
      params.allergy || '',
      params.allergy_detail || '',
      count,
      companions.join(' / '),
      params.message || '',
      params.bus || ''
    ];
    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// ブラウザで直接URLを開いたときの確認用（任意）
function doGet() {
  return ContentService.createTextOutput('RSVP receiver is running.');
}
