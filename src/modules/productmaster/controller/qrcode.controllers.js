import QRCodeModel from "../models/qr.model.js";
import BaseService from "../../../services/service.js";
import fs from "fs";
import path from "path";
import bwipjs from "bwip-js";
import { generateUniqueBarcodeText } from "../../../utils/barcode.helpers.js";
// import { de } from "zod/v4/locales";

const qrService = new BaseService(QRCodeModel);

export const createQRCode = async (req, res) => {
  try {
    let { text } = req.body;

    // If text not provided, generate a unique numeric text
    if (!text || text.trim() === "") {
      text = generateUniqueBarcodeText(); // make sure this returns numbers
    }

    // Generate QR code with visible text (numbers) below it
    const png = await bwipjs.toBuffer({
      bcid: "qrcode",
      text,
      scale: 5,
      includetext: true,      // show text below QR code
      textxalign: "center",   // center the text
      paddingwidth: 10,
      paddingheight: 10,
      backgroundcolor: "FFFFFF",
    });

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), "uploads", "qrcodes");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    // Save QR code image
    const fileName = `qrcode_${Date.now()}.png`;
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, png);

    const imageUrl = `/uploads/qrcodes/${fileName}`;

    // Save to database
    const record = await qrService.create({
      text,
      type: "qrcode",
      image_url: imageUrl,
    });

    return res.sendSuccess(record, "QR Code generated & saved successfully");
  } catch (err) {
    return res.sendError("QR Code creation failed", 400, err.message);
  }
};

export const getQRCodeById = async (req, res) => {
  try {
    const { id } = req.params;
    const qrCode = await qrService.getById(id);
    return res.sendSuccess(qrCode, "QR Code fetched successfully");
  } catch (err) {
    return res.sendError(err.message || "Failed to fetch QR Code", 400);
  }
};
export const deleteQRCode = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await qrService.delete(id);
    return res.sendSuccess(result, "QR Code deleted successfully");
  } catch (err) {
    return res.sendError("Delete failed", 400, err.message);
  }
};
export const updateQRcode =async (req,res)=>{
  try {
    const { id } = req.params;
    let { text } = req.body;

    // Fetch old record
    const oldRecord = await qrService.getById(id);
    if (!oldRecord) {
      return res.sendError("QR Code not found", 404);
    }

    // If text is empty, use existing text
    if (!text || text.trim() === "") {
      text = oldRecord.text;
    }

    // --- Generate new QR Code ---
    const png = await bwipjs.toBuffer({
      bcid: "qrcode",
      text,
      scale: 5,
      includetext: true,
      textxalign: "center",
      paddingwidth: 10,
      paddingheight: 10,
      backgroundcolor: "FFFFFF",
    });

    // Directory
    const uploadDir = path.join(process.cwd(), "uploads", "qrcodes");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // New file name
    const fileName = `qrcode_${Date.now()}.png`;
    const filePath = path.join(uploadDir, fileName);

    // Save new image
    fs.writeFileSync(filePath, png);

    // Delete old file if exists
    if (oldRecord.image_url) {
      const oldImagePath = path.join(process.cwd(), oldRecord.image_url);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // Updated URL
    const updatedImageUrl = `/uploads/qrcodes/${fileName}`;

    // DB update
    const updated = await qrService.update(id, {
      text,
      image_url: updatedImageUrl,
    });

    return res.sendSuccess(updated, "QR Code updated successfully");
  } catch (err) {
    return res.sendError("QR Code update failed", 400, err.message);
  }
};
export const getAllQRCodes = async (req, res) => {
  try {
    const all = await qrService.getAll();
    return res.sendSuccess(all, "All QR Codes fetched");
  } catch (err) {
    return res.sendError("Failed to fetch QR Codes", 400, err.message);
  }
};
  export default {createQRCode,getAllQRCodes,getQRCodeById,updateQRcode,deleteQRCode};




