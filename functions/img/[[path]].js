/* ===========================================================================
 * GET /img/<key> — KV から画像を配信（公開読み取り）
 * env.WEDI_ASSETS … KV バインディング
 * =========================================================================== */

export async function onRequestGet(context) {
  const { params, env } = context;
  const kv = env.WEDI_ASSETS;
  if (!kv) { return new Response('ストレージが未設定です', { status: 500 }); }

  // [[path]] は配列で渡る（例: ['kyoto-family-wedding-2026', 'cover', 'xxx.jpg']）
  const key = Array.isArray(params.path) ? params.path.join('/') : String(params.path || '');
  if (!key) { return new Response('Not found', { status: 404 }); }

  const { value, metadata } = await kv.getWithMetadata(key, { type: 'arrayBuffer' });
  if (!value) { return new Response('Not found', { status: 404 }); }

  const headers = new Headers();
  headers.set('Content-Type', (metadata && metadata.contentType) || 'application/octet-stream');
  headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  headers.set('Access-Control-Allow-Origin', '*');

  return new Response(value, { headers });
}
