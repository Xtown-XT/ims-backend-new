import Income from "../models/addincome.models.js";
import BaseService from "../../../services/service.js";

const incomeService = new BaseService(Income);

// CREATE INCOME
export const createIncome = async (req, res) => {
  try {
    const {
      date,
      category_id,
      store_id,
      amount,
      status,
      description
    } = req.body;

    const created_by = req.user?.id; // from token

    // VALIDATION
    if (!date || !category_id || !store_id || !amount || !status || !description) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (!created_by) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const data = {
      date,
      category_id,
      store_id,
      amount,
      status,
      description,
      created_by,
    };

    const newRecord = await incomeService.create(data);

    return res.status(201).json({
      message: "Income created successfully",
      data: newRecord,
    });

  } catch (error) {
    console.error("Error creating income:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export default {
  createIncome,
};
