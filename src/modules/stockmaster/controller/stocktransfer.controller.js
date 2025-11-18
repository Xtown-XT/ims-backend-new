import { Op } from "sequelize";
import BaseService from "../../../services/service.js";
import StockTransferModel from "../models/stocktransfer.js";
import { formatDates } from "../../../utils/dataFormatter.js";

const stockTransferService = new BaseService(StockTransferModel);

// ✅ Create Stock Transfer
export const createStockTransfer = async (req, res) => {
  try {
    const data = req.body;
    const newStockTransfer = await stockTransferService.create(data);

    return res.status(201).json({
      message: "Stock Transfer created successfully",
      data: newStockTransfer,
    });
  } catch (error) {
    console.error("Error creating stock transfer:", error);
    return res.status(500).json({
      message: "Failed to create stock transfer",
      error: error.message,
    });
  }
};

// ✅ Get All Stock Transfers (with pagination, search, sorting)
export const getAllStockTransfers = async (req, res) => {
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

    const result = await stockTransferService.getAll({
      includeInactive: includeInactiveBool,
      search,
      page: Number(page),
      limit: Number(limit),
      orderBy: String(orderBy),
      order: String(order),
      searchFields: ["warehouse_from", "warehouse_to", "product"],
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
    console.error("Error getting stock transfers:", error);
    return res.status(500).json({
      message: "Failed to get stock transfers",
      error: error.message,
    });
  }
};

// ✅ Get Stock Transfer by ID
export const getStockTransferById = async (req, res) => {
  try {
    const { id } = req.params;
    const stockTransfer = await stockTransferService.getById(id);

    return res.status(200).json(stockTransfer);
  } catch (error) {
    console.error("Error getting stock transfer by ID:", error);
    return res.status(500).json({
      message: "Failed to get stock transfer by ID",
      error: error.message,
    });
  }
};

// ✅ Update Stock Transfer
export const updateStockTransfer = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await stockTransferService.update(id, req.body);

    return res.status(200).json({
      message: "Stock Transfer updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Error updating stock transfer:", error);
    return res.status(500).json({
      message: "Failed to update stock transfer",
      error: error.message,
    });
  }
};

// ✅ Delete Stock Transfer
export const deleteStockTransfer = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await stockTransferService.delete(id);

    return res.status(200).json({
      message: "Stock Transfer deleted successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error deleting stock transfer:", error);
    return res.status(500).json({
      message: "Failed to delete stock transfer",
      error: error.message,
    });
  }
};

export default {
  createStockTransfer,
  getAllStockTransfers,
  getStockTransferById,
  updateStockTransfer,
  deleteStockTransfer,
};
