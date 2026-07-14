/* ===========================================================================
 * POST /api/upload — 画像を KV に保存し、公開URLを返す
 * multipart/form-data で file（画像）と任意の folder を受け取る。
 * env.WEDI_ASSETS … KV バインディング（wrangler.toml で定義）
 * 返り値: { url: "<オリジン>/img/<key>" }
 * =========================================================================== */

const MAX_BYTES = 10 * 1024 * 1024; // 10MB（KV の値は最大25MB）
const ALLOWED = /^image\//;

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}

export async function onRequestOptions() {
  return json({ ok: true });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const kv = env.WEDI_ASSETS;
  if (!kv) { return json({ error: 'ストレージが未設定です' }, 500); }

  let form;
  try {
    form = await request.formData();
  } catch (e) {
    return json({ error: 'フォームの解析に失敗しました' }, 400);
  }

  const file = form.get('file');
  if (!file || typeof file === 'string') { return json({ error: 'ファイルがありません' }, 400); }
  if (!ALLOWED.test(file.type || '')) { return json({ error: '画像ファイルを選んでください' }, 400); }
  if (file.size > MAX_BYTES) { return json({ error: '画像は10MBまでです' }, 400); }

  // 保存キーを組み立て（prefix/folder/タイムスタンプ-乱数.ext）
  const prefix = 'kyoto-family-wedding-2026';
  const rawFolder = String(form.get('folder') || '').replace(/[^\w-]/g, '');
  const ext = ((file.name || '').split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg';
  const stamp = Date.now();
  const rand = Math.random().toString(36).slice(2, 10);
  const parts = [prefix];
  if (rawFolder) { parts.push(rawFolder); }
  parts.push(stamp + '-' + rand + '.' + ext);
  const key = parts.join('/');

  try {
    const buf = await file.arrayBuffer();
    await kv.put(key, buf, {
      metadata: { contentType: file.type || 'application/octet-stream' }
    });
  } catch (e) {
    return json({ error: 'アップロードに失敗しました: ' + (e && e.message ? e.message : 'unknown') }, 500);
  }

  const origin = new URL(request.url).origin;
  return json({ url: origin + '/img/' + key });
}
