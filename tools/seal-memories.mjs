/**
 * 思い出アルバム（memories.html）の接続先を合言葉で暗号化して
 * core/memories-sealed.js に書き出すスクリプト。
 *
 * 写真一覧の取得先（Memory Camera の GAS の URL とイベントコード）を
 * そのままページに置くと、ソースを見れば誰でも写真にたどり着けてしまう。
 * 合言葉から作った鍵で暗号化しておき、正しい合言葉を入れたときだけ復号できるようにする。
 *
 * 合言葉は2つ。どちらで開いたかで見られるアルバムが変わる。
 *   新郎側 … 京都観光 ＋ 結婚式
 *   新婦側 … 結婚式のみ（暗号化する中身に京都観光のイベントコードを入れないので、
 *            ソースを調べても京都観光の写真は取れない）
 *
 * 使い方（プロジェクト直下で実行）:
 *   node tools/seal-memories.mjs
 *   → 合言葉2つ・GAS の URL・イベントコード2つを順に聞かれる
 *
 * 環境変数で渡すこともできる（入力を省略したいとき）:
 *   MEM_PASS_GROOM   新郎側の合言葉
 *   MEM_PASS_BRIDE   新婦側の合言葉
 *   MEM_ENDPOINT     https://script.google.com/macros/s/.../exec
 *   MEM_CODE_KYOTO   京都観光のイベントコード
 *   MEM_CODE_WEDDING 結婚式のイベントコード
 *
 * 合言葉を変えたいときも、このスクリプトを実行し直してデプロイするだけでよい。
 * 合言葉の比較は memories.js と同じく「前後の空白を除き、全角英数を半角にそろえる」。
 */
import { webcrypto as crypto } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

const ITERATIONS = 250000;
const OUT = process.env.MEM_OUT || 'core/memories-sealed.js'; // MEM_OUT は動作確認用

function normalizePass(s) {
  return String(s || '').normalize('NFKC').trim();
}

async function ask(rl, label, envName) {
  if (process.env[envName]) return process.env[envName];
  return (await rl.question(label)).trim();
}

const rl = createInterface({ input: stdin, output: stdout });
const groomPass = normalizePass(await ask(rl, '新郎側の合言葉（京都観光＋結婚式）: ', 'MEM_PASS_GROOM'));
const bridePass = normalizePass(await ask(rl, '新婦側の合言葉（結婚式のみ）: ', 'MEM_PASS_BRIDE'));
const endpoint = await ask(rl, 'GAS の URL: ', 'MEM_ENDPOINT');
const kyoto = await ask(rl, '京都観光のイベントコード: ', 'MEM_CODE_KYOTO');
const wedding = await ask(rl, '結婚式のイベントコード: ', 'MEM_CODE_WEDDING');
rl.close();

if (!groomPass || !bridePass) throw new Error('合言葉が空です');
if (groomPass === bridePass) throw new Error('新郎側と新婦側の合言葉が同じです。別のものにしてください');
if (!/^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(endpoint)) {
  throw new Error('GAS の URL の形式が違います（https://script.google.com/macros/s/.../exec）');
}
if (!kyoto || !wedding) throw new Error('イベントコードが空です');

const enc = new TextEncoder();
const b64 = (u8) => Buffer.from(u8).toString('base64');

async function seal(pass, payload) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const baseKey = await crypto.subtle.importKey('raw', enc.encode(pass), 'PBKDF2', false, ['deriveKey']);
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: ITERATIONS, hash: 'SHA-256' },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  );
  const data = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(JSON.stringify(payload))));
  return { v: 2, iter: ITERATIONS, salt: b64(salt), iv: b64(iv), data: b64(data) };
}

const envelopes = [
  await seal(groomPass, { side: 'groom', endpoint, eventCodes: { kyoto, wedding } }),
  await seal(bridePass, { side: 'bride', endpoint, eventCodes: { wedding } }),
];
// 並び順からどちらが新郎側か分からないように、ランダムに入れ替える
if (crypto.getRandomValues(new Uint8Array(1))[0] & 1) envelopes.reverse();

const out = `// tools/seal-memories.mjs が生成するファイル。直接編集しない。
// 思い出アルバムの接続先を合言葉で暗号化したもの（合言葉がないと復号できない）。
// 新郎側・新婦側の2つ。どちらがどちらかは、復号するまで分からない。
window.MEMORIES_SEALED = ${JSON.stringify(envelopes, null, 2)};
`;
writeFileSync(OUT, out, 'utf8');
console.log(`${OUT} を書き出しました`);
