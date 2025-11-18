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
  "/addExpesescategory",verifyToken,authorizeRole(["admin", "superadmin", "user"]),
  validate(expenseCategorySchema),
 addexpensescontrollers.
  addExpesescategory
);

// /**
//  * Get All Expense Categorie
//  */
router.get("/getAllExpenseCategories",verifyToken,authorizeRole(["admin", "superadmin", "user"]), addexpensescontrollers.getAllExpenseCategories);

/**
 * Get Category by ID
 */
   router.get("/getExpenseCategoryById/:id",verifyToken,authorizeRole(["admin", "superadmin", "user"]), addexpensescontrollers.getExpenseCategoryById);

// /**
//  * Update Expense Category
router.put(
  "/updateExpenseCategory/:id",verifyToken,authorizeRole(["admin", "superadmin", "user"]),
  validate(expenseCategorySchema),
  addexpensescontrollers.updateExpenseCategory
);


// /**
//  * Delete Expense Category
   router.delete("/deleteExpenseCategory/:id",verifyToken,authorizeRole(["admin", "superadmin", "user"]), addexpensescontrollers.deleteExpenseCategory);

export default router;
