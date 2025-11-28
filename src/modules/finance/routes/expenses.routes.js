import Router from "express";
import expenseController from "../controllers/expenses.controllers.js";
import { verifyEmployeeToken } from "../../../middleware/empAuth.js";
import { validate } from "../../../middleware/validate.js";
import { createExpenseSchema, updateExpenseSchema } from "../zod/expenses.zod.js";

const router = Router();

router.post("/createExpense",verifyEmployeeToken,validate(createExpenseSchema), expenseController.createExpense);
router.get("/getAllExpenses",verifyEmployeeToken, expenseController.getAllExpenses);
router.get("/getExpenseById/:id",verifyEmployeeToken,validate(updateExpenseSchema),  expenseController.getExpenseById);
router.delete("/deeleteExpense/:id",verifyEmployeeToken,expenseController.deeleteExpense);


export default router;
