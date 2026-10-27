import { put, list, del } from "@vercel/blob";
const isAdmin = (req) => req.headers["x-admin-password"] === process.env.ADMIN_PASSWORD;
const read = async (b) => (await fetch(b.url + "?t=" + Date.now(), { cache: "no-store" })).json();
export default async function handler(req, res) {
  const { slug, admin } = req.query;
  try {
    if (req.method === "GET" && slug) {
      const { blobs } = await list({ prefix: `galleries/${slug}.json` });
      if (!blobs.length) return res.status(404).json({ error: "No existe" });
      return res.json(await read(blobs[0])); // privada = solo accesible con el enlace
    }
    if (req.method === "GET") {
      if (admin && !isAdmin(req)) return res.status(401).json({ error: "No autorizado" });
      const { blobs } = await list({ prefix: "galleries/" });
      let all = await Promise.all(blobs.map(read));
      if (!admin) all = all.filter((g) => g.visibility === "public");
      return res.json(all.map((g) => ({ slug: g.slug, title: g.title, visibility: g.visibility, count: g.photos.length })));
    }
    if (!isAdmin(req)) return res.status(401).json({ error: "No autorizado" });
    if (req.method === "POST") {
      const g = req.body;
      await put(`galleries/${g.slug}.json`, JSON.stringify(g), { access: "public", addRandomSuffix: false, allowOverwrite: true, contentType: "application/json", cacheControlMaxAge: 60 });
      return res.json({ ok: true });
    }
    if (req.method === "DELETE") {
      const { blobs } = await list({ prefix: `galleries/${slug}.json` });
      if (blobs.length) { const g = await read(blobs[0]); await del([blobs[0].url, ...g.photos]); }
      return res.json({ ok: true });
    }
    res.status(405).end();
  } catch (e) { res.status(500).json({ error: e.message }); }
}
