import { handleUpload } from "@vercel/blob/client";
export default async function handler(req, res) {
  try {
    const json = await handleUpload({ body: req.body, request: req,
      onBeforeGenerateToken: async (_p, clientPayload) => {
        if (clientPayload !== process.env.ADMIN_PASSWORD) throw new Error("No autorizado");
        return { allowedContentTypes: ["image/jpeg","image/png","image/webp"], maximumSizeInBytes: 50*1024*1024 };
      },
      onUploadCompleted: async () => {} });
    res.status(200).json(json);
  } catch (e) { res.status(400).json({ error: e.message }); }
}
