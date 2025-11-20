import Expens from "../models/expenses.models.js";

import BaseService from "../../../services/service.js";
import { formatDates } from "../../../utils/dataFormatter.js";
import { record } from "zod";

const expenseService = new BaseService(Expens);

export const createexpense = async (req,res)=>{
    try{
        const { expense,description,category,date,amount } = req.body;
        const created_by = req.user?.id;

        if(!expense || !description || !category|| !date ||!amount){
            return res.status(400).json({ message: "All required fields must be filled" });
        }
        if(!created_by){
            return res.status(401).json({ message: "User not authenticated" });
        }

        const data = {expense,description,category,date,amount,created_by};

        const newRecord = await expenseService.create(data);

        return res.status(201).json({
            message: "Expense created successfully",
            data: newRecord,
        });
    }catch(error){
        console.error("Error creating expense:", error);
        return res.status(500).json({
            message: "Failed to create expense",
            error: error.message,
        });
    }
}



// Get All Expenses

export const getAllexpenses = async (req,res)=>{
    try{
          const {
      page = 1,
      limit = 10,
      search = "",
      orderBy = "createdAt",
      order = "DESC",
      includeInactive = "false",
    } = req.query;

    const includeInactiveBool = includeInactive === "true";

    const result = await expenseService.getAll({
      includeInactive: includeInactiveBool,
      search,
      page: Number(page),
      limit: Number(limit),
      orderBy: String(orderBy),
      order: String(order),
      searchFields: ["expense", "description", "category", "date", "amount"],
    });

    const { rows = [], count = 0, totalPages = 0 } = result;

    const toPlain = (item) => {
      if (!item) return item;
      if (typeof item.toJSON === "function") return item.toJSON();
      return item;
    };

    const formattedData = rows.map((item) => formatDates(item));

    return res.status(200).json({
      message: "Expenses fetched successfully",
      data: formattedData,
      count,
      totalPages,
    });
    }catch(error){
        console.error("Error fetching expenses:", error);
        return res.status(500).json({
            message: "Failed to fetch expenses",
            error: error.message,
        });

    }
}

export const getExpenseById = async (req,res)=>{
    try{
        const {id}=req.params;
    const expenses = await expenseService.getById(id);
    if(!expenses){
        return res.status(404).json({message:"Expense not found"});
    }
    const plain = typeof record.toJSON === "function"?record.toJSON():record;

    return res.status(200).json(formatDates(plain));
    }catch(error){
        console.error("Error fetching expense by ID:", error);
        return res.status(500).json({
            message: "Failed to fetch expense",
            error: error.message,
        });
    }

    }
    // Update Expense

    export const updateexpenses = async (req,res)=>{
        try{
            const {id}=req.params;
            const data = req.body
            const updated = await expenseService.update(id,data);
            res.status(200).json({message:"Expense updated successfully",data:updated});
        }catch(error){
            console.error("Error updating expense:", error);
            return res.status(500).json({
                message: "Failed to update expense",
                error: error.message,
            });
        }
    }
     export default{
        createexpense,
        getAllexpenses,
        getExpenseById,
        updateexpenses
    }




