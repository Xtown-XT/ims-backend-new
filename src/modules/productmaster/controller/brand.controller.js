
// src/modules/productmaster/controllers/brand.controller.js
import BaseService from "../../../services/service.js";
import { formatDates } from "../../../utils/dataFormatter.js";
import Brand from "../models/brand.model.js";

const brandService = new BaseService(Brand);

const createBrand = async (req, res) => {
  try {
    const { brand_name } = req.body;
    const created_by = req.user?.id; // ✅ Get user ID from token/middleware

    if (!brand_name) {
      return res.status(400).json({ message: "brand_name is required" });
    }

    if (!created_by) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const data = {
      brand_name,
      created_by,
      image: req.file ? `/uploads/brands/${req.file.filename}` : null,
    };

    const newRecord = await brandService.create(data);

    return res.status(201).json({
      message: "Brand created successfully",
      data: newRecord,
    });
  } catch (error) {
    console.error("Error creating brand:", error);
    return res.status(500).json({
      message: "Failed to create brand",
      error: error.message,
    });
  }
};

const getAllBrands = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      orderBy = "brand_name",
      order = "ASC",
      includeInactive = "false",
    } = req.query;

    const includeInactiveBool = includeInactive === "true";

    const result = await brandService.getAll({
      includeInactive: includeInactiveBool,
      search,
      page: Number(page),
      limit: Number(limit),
      orderBy: String(orderBy),
      order: String(order),
      searchFields: ["brand_name",],
    });

    const { rows = [], count = 0, totalPages = 0 } = result;

    const toPlain = (item) => {
      if (!item) return item;
      if (typeof item.toJSON === "function") return item.toJSON();
      return item;
    };

    const formattedRows = rows.map((r) => formatDates(toPlain(r)));

    return res.status(200).json({
      rows: formattedRows,
      count,
      page: Number(page),
      limit: Number(limit),
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching brands:", error);
    return res.status(500).json({
      message: "Failed to fetch brands",
      error: error.message,
    });
  }
};

const getBrandById = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await brandService.getById(id);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    const plain = typeof brand.toJSON === "function" ? brand.toJSON() : brand;
    return res.status(200).json(formatDates(plain));
  } catch (error) {
    console.error("Error fetching brand:", error);
    return res.status(500).json({ message: "Failed to fetch brand", error: error.message });
  }
};

const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    if (req.file) data.image = `/uploads/brands/${req.file.filename}`;

    const result = await brandService.update(id, data);

    // Normalize possible return shapes from your BaseService
    let updatedRowsCount = 0;
    let updatedRows = [];

    if (Array.isArray(result) && result.length >= 2) {
      updatedRowsCount = result[0];
      updatedRows = result[1];
    } else if (result && result.affectedRows !== undefined) {
      updatedRowsCount = result.affectedRows;
      updatedRows = result.rows || [];
    } else if (result && result.id) {
      updatedRowsCount = 1;
      updatedRows = [result];
    }

    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: "Brand not found" });
    }

    const updatedBrand = updatedRows[0];
    const plain = typeof updatedBrand.toJSON === "function" ? updatedBrand.toJSON() : updatedBrand;

    return res.status(200).json({ message: "Brand updated successfully", data: plain });
  } catch (error) {
    console.error("Error updating brand:", error);
    return res.status(500).json({ message: "Failed to update brand", error: error.message });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await brandService.delete(id);

    if (result === true || (typeof result === "number" && result > 0) || (result && result.affectedRows > 0)) {
      return res.status(200).json({ message: "Brand deleted successfully" });
    }

    if (result && result.id) {
      return res.status(200).json({ message: "Brand deleted successfully", data: result });
    }

    return res.status(404).json({ message: "Brand not found or already deleted" });
  } catch (error) {
    console.error("Error deleting brand:", error);
    return res.status(500).json({ message: "Failed to delete brand", error: error.message });
  }
};

export default {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
};

