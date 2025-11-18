import Barcode from "../models/barcode.model.js";
import BaseService from "../../../services/service.js";
import fs from "fs";
import path from "path";
import bwipjs from "bwip-js";
import { barcodeSchema } from "../dto/barcode.zod.js";
import { generateUniqueBarcodeText } from "../../../utils/barcode.helpers.js";

const barcodeService = new BaseService(Barcode);

// ----------------------------
// CREATE BARCODE
// ----------------------------
export const createBarcode = async (req, res) => {
 try {
    // ZOD VALIDATION
    const validated = barcodeSchema.parse(req.body);

    // Generate unique barcode text if user does not send text
    let finalText = validated.text;
    if (!finalText || finalText.trim() === "") {
      finalText = generateUniqueBarcodeText();
    }

    // Generate barcode image
    const png = await bwipjs.toBuffer({
      bcid: validated.type,
      text: finalText,
      scale: validated.scale,
      height: validated.height,
      includetext: validated.includetext === true || validated.includetext === "true",
      textxalign: validated.textxalign,
      paddingwidth: 10,
      paddingheight: 10,
      backgroundcolor: "FFFFFF",
    });

    // Ensure folder exists
    const uploadDir = path.join(process.cwd(), "uploads", "barcodes");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    // Save image
    const fileName = `barcode_${Date.now()}.png`;
    fs.writeFileSync(path.join(uploadDir, fileName), png);

    const imageUrl = `/uploads/barcodes/${fileName}`;

    // Save to DB
    const record = await barcodeService.create({
      text: finalText,
      type: validated.type,
      image_url: imageUrl,
    });

    return res.sendSuccess(record, "Barcode generated & saved successfully");
  } catch (err) {
    return res.sendError("Barcode creation failed", 400, err.message);
  }
};
export const getAllBarcodes = async (req, res) => {
  try {
    // adapt query params if you want pagination/search
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const search = req.query.search || "";

    const result = await barcodeService.getAll({
      search,
      searchFields: ["text", "type"],
      page,
      limit,
      orderBy: "createdAt",
      order: "DESC",
    });

    // barcodeService.getAll returns { rows, count, page, limit, totalPages }
    return res.sendSuccess(result, "All barcodes fetched");
  } catch (err) {
    return res.sendError("Failed to fetch barcodes", 400, err.message);
  }
};

export const getBarcodeById = async (req, res) => {
  try {
    const { id } = req.params;
    const barcode = await barcodeService.getById(id);
    return res.sendSuccess(barcode, "Barcode fetched successfully");
  } catch (err) {
    return res.sendError(err.message || "Failed to fetch barcode", 400);
  }
};

export const deleteBarcode = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await barcodeService.delete(id);
    return res.sendSuccess(result, "Barcode deleted successfully");
  } catch (err) {
    return res.sendError("Delete failed", 400, err.message);
  }
};

export const updateBarcode = async (req, res) => {
  try {
    const { id } = req.params;

    // ensure record exists
    const existing = await barcodeService.getById(id);

    const {
      text = existing.text,
      type = existing.type,
      scale = 3,
      height = 10,
      includetext = true,
      textxalign = "center",
    } = req.body;

    const png = await bwipjs.toBuffer({
      bcid: type,
      text,
      scale: Number(scale),
      height: Number(height),
      includetext: includetext === true || includetext === "true",
      textxalign,
      paddingwidth: 10,
      paddingheight: 10,
      backgroundcolor: "FFFFFF",
    });

    const uploadDir = path.join(process.cwd(), "uploads", "barcodes");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const fileName = `barcode_${Date.now()}.png`;
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, png);

    const imageUrl = `/uploads/barcodes/${fileName}`;

    await barcodeService.update(id, {
      text,
      type,
      image_url: imageUrl,
    });

    const updated = await barcodeService.getById(id);
    return res.sendSuccess(updated, "Barcode updated successfully");
  } catch (err) {
    return res.sendError("Update failed", 400, err.message);
  }
};





export default {
  createBarcode,
  getAllBarcodes,
  getBarcodeById,
  deleteBarcode,
   updateBarcode 
 
};
