import { Router } from "express";
import qrcodeControllers from "../controller/qrcode.controllers.js";
import { verifyEmployeeToken } from "../../../middleware/empAuth.js";
import { validate } from "../../../middleware/validate.js";
import { createQRSchema, updateQRSchema, idSchema } from "../dto/qrcode.zod.js";

const router = Router();

// Create QR Code
router.post(
  "/createQRCode",
  verifyEmployeeToken,
  validate(createQRSchema),
  qrcodeControllers.createQRCode
);

// Get QR Code by ID
router.get(
  "/getQRCodeById/:id",
  validate(idSchema),
  qrcodeControllers.getQRCodeById
);

// Update QR Code
router.put(
  "/updateQRCode/:id",
  verifyEmployeeToken,
  validate(idSchema),
  validate(updateQRSchema),
  qrcodeControllers.updateQRcode
);

// Delete QR Code
router.delete(
  "/deleteQRCode/:id",
  validate(idSchema),
  qrcodeControllers.deleteQRCode
);

// Get All QR Codes
router.get(
  "/getAllQRCodes",
  qrcodeControllers.getAllQRCodes
);

export default router;
