import ExpenseCategory from "../models/addexpenescategory.models.js";
import BaseService from "../../../services/service.js";
import { formatDates } from "../../../utils/dataFormatter.js";


const expenseCategoryService = new BaseService(ExpenseCategory);


export const addExpesescategory = async (req,res,next)=>{
     try {
    const { category_name, description, status } = req.body;
    const created_by = req.user?.id; // get user from auth middleware

    if (!category_name || !description || !status) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    if (!created_by) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const data = { category_name, description, status, created_by };

    const newRecord = await expenseCategoryService.create(data);

    return res.status(201).json({
      message: "Expense category created successfully",
      data: newRecord,
    });
  } catch (error) {
    console.error("Error creating expense category:", error);
    return res.status(500).json({
      message: "Failed to create expense category",
      error: error.message,
    });
    
  }
};

// Get all Expense Categories
export const getAllExpenseCategories = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      orderBy = "createdAt",
      order = "DESC",
      includeInactive = "false",
    } = req.query;

    const includeInactiveBool = includeInactive === "true";

    const result = await expenseCategoryService.getAll({
      includeInactive: includeInactiveBool,
      search,
      page: Number(page),
      limit: Number(limit),
      orderBy: String(orderBy),
      order: String(order),
      searchFields: ["category_name", "description"],
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
    console.error("Error fetching expense categories:", error);
    return res.status(500).json({
      message: "Failed to fetch expense categories",
      error: error.message,
    });
  }
};

// Get Expense Category by ID
export const getExpenseCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await expenseCategoryService.getById(id);

    if (!record) {
      return res.status(404).json({ message: "Expense category not found" });
    }

    const plain = typeof record.toJSON === "function" ? record.toJSON() : record;

    return res.status(200).json(formatDates(plain));
  } catch (error) {
    console.error("Error fetching expense category by ID:", error);
    return res.status(500).json({
      message: "Failed to fetch expense category",
      error: error.message,
    });
  }
};

// Update Expense Category
export const updateExpenseCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    if (req.file) data.image = `${req.file.filename}`;

    const result = await expenseCategoryService.update(id, data);

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
      return res.status(404).json({ message: "Expense category not found" });
    }

    const updatedRecord = updatedRows[0];
    const plain = typeof updatedRecord.toJSON === "function" ? updatedRecord.toJSON() : updatedRecord;

    return res.status(200).json({ message: "Expense category updated successfully", data: plain });
  } catch (error) {
    console.error("Error updating expense category:", error);
    return res.status(500).json({
      message: "Failed to update expense category",
      error: error.message,
    });
  }
};

// Delete Expense Category
export const deleteExpenseCategory = async (req, res) => {
 try {
    const { id } = req.params;

    // Fetch record including soft-deleted ones
    const record = await ExpenseCategory.findByPk(id, { paranoid: false });

    if (!record) {
      return res.status(404).json({
        message: "Expense category not found or already deleted",
      });
    }

    // Soft delete (because paranoid: true)
    await record.destroy();

    return res.status(200).json({
      message: "Expense category deleted successfully",
    });

  } catch (error) {
    console.error("Error deleting expense category:", error);
    return res.status(500).json({
      message: "Failed to delete expense category",
      error: error.message,
    });
  }
};

export default {
 addExpesescategory,
 getAllExpenseCategories,
  getExpenseCategoryById,
  updateExpenseCategory,
  deleteExpenseCategory,
};