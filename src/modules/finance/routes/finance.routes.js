import { Router } from "express";
import {
  addExpesescategory,
  // getAllExpenseCategories,
  // getExpenseCategoryById,
  // updateExpenseCategory,
  // deleteExpenseCategory,
} from "../controllers/addexpenses.controllers.js";

import {
  expenseCategorySchema,
  // expenseCategoryUpdateSchema,
} from "../zod/addfinace.zod.js";

import { validate } from "../../../middleware/validate.js"; 
import { verifyToken } from "../../../middleware/auth.js";
import { authorizeRole } from "../../../middleware/authenticateRole.js";

const router = Router();

/**
 * Create Expense Category
 */
router.post(
  "/createExpenseCategory",verifyToken,authorizeRole(["admin", "superadmin", "user"]),
  validate(expenseCategorySchema),
  addExpesescategory
);

// /**
//  * Get All Expense Categories
//  */
// router.get("/getAllExpenseCategory", getAllExpenseCategories);

// /**
//  * Get Category by ID
//  */
// router.get("/getExpenseCategoryById/:id", getExpenseCategoryById);

// /**
//  * Update Expense Category
//  */
// router.put(
//   "/updateExpenseCategory/:id",
//   validate(expenseCategoryUpdateSchema),
//   updateExpenseCategory
// );

// /**
//  * Delete Expense Category
//  */
// router.delete("/deleteExpenseCategory/:id", deleteExpenseCategory);

export default router;
