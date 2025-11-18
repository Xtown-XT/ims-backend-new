import { Op } from "sequelize";
import BaseService from "../../../services/service.js";
import ManageStockModel from "../models/managestock.js";
import { formatDates } from "../../../utils/dataFormatter.js";

const manageStockService = new BaseService(ManageStockModel);

export const createManageStock = async (req, res) => {
    try {
        const data = req.body;
        const newManageStock = await manageStockService.create(data);

        return res.status(201).json({
            message: "Manage Stock created successfully",
            data: newManageStock,
        });
    } catch (error) {
        console.error("Error creating manage stock:", error);
        return res.status(500).json({
            message: "Failed to create manage stock",
            error: error.message,
        });
    }
};

export const getAllManageStock = async (req, res) => {
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

    const result = await manageStockService.getAll({
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
    console.error("Error getting manage stock:", error);
    return res.status(500).json({
      message: "Failed to get manage stock",
      error: error.message,
    });
  }
};


export const getManageStockById = async (req, res) => {
    try {
        const { id } = req.params;
        const manageStock = await manageStockService.getById(id);

        return res.status(200).json(manageStock);
    } catch (error) {
        console.error("Error getting manage stock by ID:", error);
        return res.status(500).json({
            message: "Failed to get manage stock by ID",
            error: error.message,
        });
    }
};

export const updateManageStock = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await manageStockService.update(id, req.body);

        return res.status(200).json({
            message: "Manage Stock updated successfully",
            data: updated,
        });
    } catch (error) {
        console.error("Error updating manage stock:", error);
        return res.status(500).json({
            message: "Failed to update manage stock",
            error: error.message,
        });
    }
};

export const deleteManageStock = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await manageStockService.delete(id);
        return res.status(200).json({
            message: "Manage Stock deleted successfully",
            data: result,
        });
    } catch (error) {
        console.error("Error deleting manage stock:", error);
        return res.status(500).json({
            message: "Failed to delete manage stock",
            error: error.message,
        });
    }
};

export default {
    createManageStock,
    getAllManageStock,
    getManageStockById,
    updateManageStock,
    deleteManageStock,
};