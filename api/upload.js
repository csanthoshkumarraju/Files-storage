// import formidable from "formidable-serverless";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(req, res) {
//   try {
//     if (req.method !== "POST") {
//       return res.status(405).json({ error: "Method not allowed" });
//     }

//     const form = new formidable.IncomingForm();
//     form.parse(req, async (err, fields, files) => {
//       if (err) return res.status(500).json({ error: err.message });

//       const folderName = fields.folderName || "others";
//       const file = files.file;
//       if (!file) return res.status(400).json({ error: "File is required" });

//       const fs = require("fs");
//       const path = require("path");
//       const base64File = fs.readFileSync(file.filepath, { encoding: "base64" });

//       const response = await fetch(process.env.UPLOAD_API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           folderName,
//           fileName: file.originalFilename,
//           fileBase64: base64File,
//         }),
//       });

//       const result = await response.json();
//       return res.status(response.status).json(result);
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: error.message });
//   }
// }


// import formidable from "formidable-serverless";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(req, res) {
//   console.log("=== /api/upload HIT ===");

//   try {
//     console.log("Method:", req.method);
//     console.log("Content-Type:", req.headers["content-type"]);

//     if (req.method !== "POST") {
//       console.log("Invalid method");
//       return res.status(405).json({ error: "Method not allowed" });
//     }

//     const form = new formidable.IncomingForm();

//     form.parse(req, async (err, fields, files) => {
//       console.log("Form parse started");

//       if (err) {
//         console.error("Form parse error:", err);
//         return res.status(500).json({ error: err.message });
//       }

//       console.log("Fields received:", fields);
//       console.log("Files received:", files);

//       const folderName = fields.folderName || "others";
//       const file = files.file;

//       if (!file) {
//         console.error("No file found in request");
//         return res.status(400).json({ error: "File is required" });
//       }

//       console.log("File details:", {
//         originalFilename: file.originalFilename,
//         filepath: file.filepath,
//         mimetype: file.mimetype,
//         size: file.size,
//       });

//       const fs = require("fs");

//       let base64File;
//       try {
//         base64File = fs.readFileSync(file.filepath, { encoding: "base64" });
//       } catch (readErr) {
//         console.error("File read error:", readErr);
//         return res.status(500).json({ error: "Failed to read uploaded file" });
//       }

//       console.log("Base64 size:", base64File.length);
//       console.log("Calling Lambda:", process.env.UPLOAD_API_URL);

//       let response;
//       try {
//         response = await fetch(process.env.UPLOAD_API_URL, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             folderName,
//             fileName: file.originalFilename,
//             fileBase64: base64File,
//           }),
//         });
//       } catch (fetchErr) {
//         console.error("Lambda fetch failed:", fetchErr);
//         return res.status(500).json({ error: "Failed to call Lambda" });
//       }

//       console.log("Lambda response status:", response.status);

//       let result;
//       try {
//         result = await response.json();
//       } catch (jsonErr) {
//         console.error("Lambda JSON parse error:", jsonErr);
//         return res.status(500).json({ error: "Invalid Lambda response" });
//       }

//       console.log("Lambda response body:", result);

//       return res.status(response.status).json(result);
//     });
//   } catch (error) {
//     console.error("Unhandled error:", error);
//     return res.status(500).json({ error: error.message });
//   }
// }


import formidable from "formidable-serverless";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    try {
      if (err) {
        return res.status(500).json({ error: "Form parse failed" });
      }

      const folderName = fields.folderName || "others";
      const file = files.file;

      if (!file || !file.path) {
        return res.status(400).json({ error: "File not received" });
      }

      // ✅ Correct property for formidable-serverless
      const fileBuffer = fs.readFileSync(file.path);
      const base64File = fileBuffer.toString("base64");

      const response = await fetch(process.env.UPLOAD_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          folderName,
          fileName: file.name,
          fileBase64: base64File,
        }),
      });

      const result = await response.json();
      return res.status(response.status).json(result);
    } catch (e) {
      return res.status(500).json({ error: "Failed to read uploaded file" });
    }
  });
}
