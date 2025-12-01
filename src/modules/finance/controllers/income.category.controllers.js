import Income from "../models/addincome.models.js";
import BaseService from "../../../services/service.js";

const incomeService = new BaseService(Income);

// Helper: generate random income code
const generateRandomIncomeCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "INC-";
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// Generate Income Code API
export const generateIncomeCode = async (req, res) => {
  try {
    const code = generateRandomIncomeCode();
    return res.status(200).json({
      message: "Generated income code",
      code,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to generate code",
      error: error.message,
    });
  }
};

// Create Income Category API
export const createIncomeCategory = async (req, res) => {
  try {
    const body = req.body || {};
    const { code, name } = body;

    // Validate name
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    // Code must be provided by user (not auto-generated)
    if (!code) {
      return res.status(400).json({ message: "Code is required. Please generate using /generate-code API" });
    }

    // Validate code format (INC-XXXXX)
    const codeRegex = /^INC-[A-Z0-9]{5}$/;
    if (!codeRegex.test(code)) {
      return res.status(400).json({
        message: "Invalid code format. Code must be like INC-XXXXX",
      });
    }

    // Check duplicate code
    const existingCode = await Income.findOne({ where: { code } });
    if (existingCode) {
      return res.status(400).json({ message: "Code already exists" });
    }

    // Check duplicate name
    const existingName = await Income.findOne({ where: { name } });
    if (existingName) {
      return res.status(400).json({ message: "Name already exists" });
    }

    // Create new income category
    const newIncome = await incomeService.create({ code, name });

    return res.status(201).json({
      message: "Income category created successfully",
      data: newIncome,
    });

  } catch (error) {
    console.error("Error creating income category:", error);
    return res.status(500).json({
      message: "Failed to create income category",
      error: error.message,
    });
  }
};

// get method ;

export const getAllincomecategory = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      orderBy = "createdAt",
      order = "DESC",
      includeInactive = "false",
    } = req.query;

    const incomeinactive = includeInactive === "true";

    // Fetch from service
    const result = await incomeService.getAll({
      includeInactive: incomeinactive,
      search,
      page: Number(page),
      limit: Number(limit),
      orderBy: String(orderBy),
      order: String(order),
      searchFields: ["code", "name"],
    });

    // FIX: correct keys from service
    const rows = result.rows || [];
    const count = result.count || 0;

    // FIX: correct pagination
    const totalpages = Math.ceil(count / Number(limit));

    // Convert to plain JSON
    const data = rows.map((item) =>
      typeof item.toJSON === "function" ? item.toJSON() : item
    );

    return res.status(200).json({
      message: "Income categories fetched successfully",
      data,
      count,
      totalpages,
    });

  } catch (error) {
    console.error("Error fetching income categories:", error);
    return res.status(500).json({
      message: "Failed to fetch income categories",
      error: error.message,
    });
  }
};
export const getIncomeCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await incomeService.getById(id);
    return res.status(200).json(record);
  } catch (error) {
    return res.status(404).json({ message: "Income category not found" });
  }
};

export const updateIncomeCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await incomeService.update(id, req.body);
    return res.status(200).json(updated);
  } catch (error) {
    return res.status(404).json({ message: "Income category not found" });
  }
};
export const deleteIncomeCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await incomeService.delete(id);
    return res.status(200).json(deleted);
  } catch (error) {
    return res.status(404).json({ message: "Income category not found" });
  }
  
};
export default {
  generateIncomeCode,
  createIncomeCategory,
  getAllincomecategory,
  getIncomeCategoryById,
  updateIncomeCategory,
  deleteIncomeCategory,
  
}
