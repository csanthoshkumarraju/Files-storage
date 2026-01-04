import formidable from "formidable-serverless";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) return res.status(500).json({ error: err.message });

      const folderName = fields.folderName || "others";
      const file = files.file;
      if (!file) return res.status(400).json({ error: "File is required" });

      const fs = require("fs");
      const path = require("path");
      const base64File = fs.readFileSync(file.filepath, { encoding: "base64" });

      const response = await fetch(process.env.UPLOAD_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          folderName,
          fileName: file.originalFilename,
          fileBase64: base64File,
        }),
      });

      const result = await response.json();
      return res.status(response.status).json(result);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
