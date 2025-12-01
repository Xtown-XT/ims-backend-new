import Expense from "../models/expenses.models.js";
import BaseService from "../../../services/service.js";
import ExpenseCategory from  "../models/addexpenescategory.models.js"
import { de } from "zod/v4/locales";

const expenseService = new BaseService(Expense);

export const createExpense = async (req,res)=>{
     try {
    const { 
      expense, 
      description, 
      category_id, 
      date, 
      amount, 
      status 
    } = req.body;

    const created_by = req.user?.id; // from token

    // VALIDATION
    if (!expense || !description || !category_id || !date || !amount || !status) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (!created_by) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // DATA TO INSERT
    const data = {
      expense,
      description,
      category_id,
      date,
      amount,
      status,
      created_by,
    };

    const newRecord = await expenseService.create(data);

    return res.status(201).json({
      message: "Expense created successfully",
      data: newRecord,
    });

  } catch (error) {
    console.error("Error creating expense:", error);
    return res.status(500).json({
      message: "Failed to create expense",
      error: error.message,
    });
  }
};

//  get all expenses

export const getAllExpenses = async (req,res)=>{
   try {
    const expenses = await Expense.findAll({
      include: [
        {
          model: ExpenseCategory,
          as: "expenseCategory",
          attributes: ["id", "category_name", "description"]
        }
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      message: "Expenses fetched successfully",
      data: expenses,
    });

  } catch (error) {
    console.error("Error fetching expenses:", error);
    return res.status(500).json({
      message: "Failed to fetch expense",
      error: error.message,
    });
  }
};




export const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Expense ID is required" });
    }

    const expense = await Expense.findOne({
      where: { id },
      include: [
        {
          model: ExpenseCategory,
          as: "expenseCategory",
          attributes: ["id", "category_name", "description"]
        }
      ]
    });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    return res.status(200).json({
      message: "Expense fetched successfully",
      data: expense,
    });

  } catch (error) {
    console.error("Error fetching expense by ID:", error);
    return res.status(500).json({
      message: "Failed to fetch expense",
      error: error.message,
    });
  }
};

export const deeleteExpense = async (req,res)=>{
   try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Expense ID is required" });
    }

    // Find record
    const record = await Expense.findByPk(id);

    if (!record) {
      return res.status(404).json({
        message: "Expense not found or already deleted",
      });
    }

    // Soft delete or hard delete depending on model settings
    await record.destroy();

    return res.status(200).json({
      message: "Expense deleted successfully",
    });

  } catch (error) {
    console.error("Error deleting expense:", error);
    return res.status(500).json({
      message: "Failed to delete expense",
      error: error.message,
    });
  }
};


export const updateExpenseById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Expense ID is required" });
    }

    const { 
      expense, 
      description, 
      category_id, 
      date, 
      amount, 
      status 
    } = req.body;

    const updated_by = req.user?.id; // from token

    // Check record exists
    const existingExpense = await Expense.findByPk(id);

    if (!existingExpense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    // Prepare update data
    const updateData = {
      expense: expense ?? existingExpense.expense,
      description: description ?? existingExpense.description,
      category_id: category_id ?? existingExpense.category_id,
      date: date ?? existingExpense.date,
      amount: amount ?? existingExpense.amount,
      status: status ?? existingExpense.status,
      updated_by
    };

    await existingExpense.update(updateData);

    return res.status(200).json({
      message: "Expense updated successfully",
      data: existingExpense,
    });

  } catch (error) {
    console.error("Error updating expense:", error);
    return res.status(500).json({
      message: "Failed to update expense",
      error: error.message,
    });
  }
};





export default {createExpense,getAllExpenses,getExpenseById,deeleteExpense,updateExpenseById};
