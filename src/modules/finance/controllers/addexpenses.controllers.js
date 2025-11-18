import ExpenseCategory from "../models/addexpenes.models.js";
import BaseService from "../../../services/service.js";

const expenseCategoryService = new BaseService(ExpenseCategory);


export const addExpesescategory = async (req,res)=>{
    try{
        const { category_name, description,satus } = req.body;
        
        if(!category_name || !description || !satus){
            return res.status(400).json({ message: "All required fields must be filled" });
        }
        const newExpensescategory = await expenseCategoryService.create({
            category_name,
            description,
            satus
        });
        return res.status(201).json({
            message: "Expense category created successfully",
            data: newExpensescategory,
        });
    } catch (error){
        console.log("Error creating expenses category:",error);
        return res.status(500).json({
            status:"error",
            message:"Internal server error",
            error:error.message
        });
    }}
    // get all expenses category

    export const getAllExpensescategory = async (req, res) =>{
        try{
            const variants = await expenseCategoryService.getAll({
                page:Number(page)||1,
                limit:Number(limit)||10,
                search:search||"",
                orderBy:"created_at",
                order:"DESC",
                searchFields:["category_name","description"],
            });
            return res.status(200).json({
                status:"success",
                message:"Expenses category fetched successfully",
                data:variants,
            });


        } catch (error){
            console.log("Error fetching expenses category:",error);
            return res.status(500).json({
                status:"error",
                message:"Internal server error",
                error:error.message
            });
        }
    };

    // get expenses category by id

    export const getExpensescategoryById = async (req,res)=>{
        try{
            const {id}= req.params;
            const record = await expenseCategoryService.getById(id);
            
            return res.status (200).json({
                status:"success",
                message:"Expenses category fetched successfully",
                data:record,
            });
        } catch (error){
            console.log("error fetching getExpensesById:",error);
            return res.status(500).json({
                status:"error",
                message:"Internal server error",
                error:error.message
            })
            
        }
    }

    // update expenses category 

    export const updateExpensescategory = async (req,res)=>{
        try{
            const {id}=req.params;
            const {category_name,description,satus}=req.body;

            const updateExpensescategory = await expenseCategoryService.update(id,{category_name,description,satus});

            return res.status(200).json({
                status:"success",
                message:"Expenses category updated successfully",
                data:updateExpensescategory,
            });
        } catch (error){
            console.log("Error updating expenses category:",error);
            return res.status(500).json({
                status:"error",
                message:"Internal server error",
                error:error.message
            });
        }
    }

    // delete expenses category

    export const deleteExpensescategory = async (req,res)=>{
        try{
            const {id}=req.params;
            const deleteExpensescategory = await expenseCategoryService.delete(id);
         
            if(!deleteExpensescategory){
                return res.status(404).json({
                    status:"error",
                    message:"Expenses category not found",
                });
            }
            return res.status(200).json({
                status:"success",
                message:"Expenses category deleted successfully",
                data:deleteExpensescategory,
            });
        } catch (error){
            console.log("Error deleting expenses category:",error);
            return res.status(500).json({
                status:"error",
                message:"Internal server error",
                error:error.message
            });



        }
    }




  
