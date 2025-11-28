import { Router } from "express";
// import {
//   addExpesescategory,
  // getAllExpenseCategories,
  // getExpenseCategoryById,
  // updateExpenseCategory,
  // deleteExpenseCategory,
// } from "../controllers/addexpenses.controllers.js";
import addexpensescontrollers from "../controllers/addexpensescategory.controllers.js"

import {
  expenseCategorySchema,
  expenseCategoryUpdateSchema,
  // expenseCategoryUpdateSchema,
} from "../zod/addfinace.zod.js";

import { validate } from "../../../middleware/validate.js"; 
import { verifyToken } from "../../../middleware/auth.js";
import { authorizeRole } from "../../../middleware/authenticateRole.js";
import { verifyEmployeeToken } from "../../../middleware/empAuth.js";

const router = Router();

/**
 * Create Expense Category
 */
router.post(
  "/addExpesescategory",
  verifyEmployeeToken,
  validate(expenseCategorySchema),
 addexpensescontrollers.
  addExpesescategory
);

// /**
//  * Get All Expense Categorie
//  */
router.get("/getAllExpenseCategories",
  verifyEmployeeToken, 
   addexpensescontrollers.getAllExpenseCategories);

/**
 * Get Category by ID
 */
   router.get("/getExpenseCategoryById/:id",
    verifyEmployeeToken,
     addexpensescontrollers.getExpenseCategoryById);

// /**
//  * Update Expense Category
router.put(
  "/updateExpenseCategory/:id",
  verifyEmployeeToken,
  validate(expenseCategoryUpdateSchema),
  addexpensescontrollers.updateExpenseCategory
);


// /**
//  * Delete Expense Category
   router.delete("/deleteExpenseCategory/:id",
    verifyEmployeeToken, 
    addexpensescontrollers.deleteExpenseCategory);

export default router;
