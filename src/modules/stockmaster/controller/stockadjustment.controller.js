import { Op } from "sequelize";
import BaseService from "../../../services/service.js";
import StockAdjustmentModel from "../models/stockadjustment.js";
import { formatDates } from "../../../utils/dataFormatter.js";

const stockAdjustmentService = new BaseService(StockAdjustmentModel);

// ✅ Create Stock Adjustment
export const createStockAdjustment = async (req, res) => {
  try {
    const data = req.body;
    const newStockAdjustment = await stockAdjustmentService.create(data);

    return res.status(201).json({
      message: "Stock Adjustment created successfully",
      data: newStockAdjustment,
    });
  } catch (error) {
    console.error("Error creating stock adjustment:", error);
    return res.status(500).json({
      message: "Failed to create stock adjustment",
      error: error.message,
    });
  }
};

// ✅ Get All Stock Adjustments (with pagination, search, sorting)
export const getAllStockAdjustments = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      sort = "createdAt",
      order = "DESC",
      includeInactive = "false",
      orderBy = "createdAt",
    } = req.query;

    const includeInactiveBool = includeInactive === "true";

    const result = await stockAdjustmentService.getAll({
      includeInactive: includeInactiveBool,
      search,
      page: Number(page),
      limit: Number(limit),
      orderBy: String(orderBy),
      order: String(order),
      searchFields: ["warehouse", "store", "product"],
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
    console.error("Error getting stock adjustments:", error);
    return res.status(500).json({
      message: "Failed to get stock adjustments",
      error: error.message,
    });
  }
};

// ✅ Get Stock Adjustment by ID
export const getStockAdjustmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const stockAdjustment = await stockAdjustmentService.getById(id);

    return res.status(200).json(stockAdjustment);
  } catch (error) {
    console.error("Error getting stock adjustment by ID:", error);
    return res.status(500).json({
      message: "Failed to get stock adjustment by ID",
      error: error.message,
    });
  }
};

// ✅ Update Stock Adjustment
export const updateStockAdjustment = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await stockAdjustmentService.update(id, req.body);

    return res.status(200).json({
      message: "Stock Adjustment updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Error updating stock adjustment:", error);
    return res.status(500).json({
      message: "Failed to update stock adjustment",
      error: error.message,
    });
  }
};

// ✅ Delete Stock Adjustment
export const deleteStockAdjustment = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await stockAdjustmentService.delete(id);

    return res.status(200).json({
      message: "Stock Adjustment deleted successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error deleting stock adjustment:", error);
    return res.status(500).json({
      message: "Failed to delete stock adjustment",
      error: error.message,
    });
  }
};

export default {
  createStockAdjustment,
  getAllStockAdjustments,
  getStockAdjustmentById,
  updateStockAdjustment,
  deleteStockAdjustment,
};
