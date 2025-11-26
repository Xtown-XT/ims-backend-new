// // src/middleware/upload.js
// import multer from "multer";
// import path from "path";
// import fs from "fs";

// // Create folder if missing
// const makeDirIfNotExists = (dir) => {
//   if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
// };

// /**
//  * Universal Upload Handler
//  * supports single & multiple images
//  *
//  * @param {string} folderName  - folder inside /uploads (ex: products, employees, categories)
//  * @param {"single" | "multiple"} type - upload type
//  * @param {string} fieldName - form-data key name
//  * @param {number} maxCount - for multi upload max files
//  */
// export const uploadImages = (
//   folderName = "products",
//   type = "single",
//   fieldName = "images",
//   maxCount = 5
// ) => {
//   const uploadDir = path.join(process.cwd(), "uploads", folderName);
//   makeDirIfNotExists(uploadDir);

//   const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, uploadDir);
//     },
//     filename: (req, file, cb) => {
//       const ext = path.extname(file.originalname);
//       const base = path.basename(file.originalname, ext).replace(/\s+/g, "_");

//       cb(
//         null,
//         `${Date.now()}_${Math.round(Math.random() * 1e9)}_${base}${ext}`
//       );
//     },
//   });

//   const fileFilter = (req, file, cb) => {
//     const allowed = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
//     allowed.includes(file.mimetype)
//       ? cb(null, true)
//       : cb(new Error("Only .jpg, .jpeg, .png, and .webp formats allowed"), false);
//   };

//   const uploader = multer({
//     storage,
//     limits: { fileSize: 5 * 1024 * 1024 },
//     fileFilter,
//   });

//   return type === "multiple"
//     ? uploader.array(fieldName, maxCount)
//     : uploader.single(fieldName);
// };


// src/middleware/upload.js
// import multer from "multer";
// import path from "path";
// import fs from "fs";

// export const uploadMultiple = (fieldName = "images", folderName = "products") => {
//   const uploadDir = path.join(process.cwd(), "uploads", folderName);

//   if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

//   const storage = multer.diskStorage({
//     destination: (req, file, cb) => cb(null, uploadDir),
//     filename: (req, file, cb) => {
//       const ext = path.extname(file.originalname);
//       const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
//       cb(null, unique);
//     }
//   });

//   return multer({ storage }).array(fieldName, 10);
// };


// src/middleware/upload.js
import multer from "multer";
import path from "path";
import fs from "fs";

export const uploadMultiple = (fieldName = "images", folderName = "products", maxCount = 10) => {
  const uploadDir = path.join(process.cwd(), "uploads", folderName);

  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      cb(null, unique);
    }
  });

  return multer({ storage }).array(fieldName, maxCount);
};
