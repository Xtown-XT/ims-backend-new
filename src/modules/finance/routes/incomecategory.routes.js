import { Router } from "express";
import incomeCategoryControllers, { createIncomeCategory } from "../controllers/income.category.controllers.js";
import { verifyEmployeeToken } from "../../../middleware/empAuth.js";
import {
  createIncomeCategorySchema,
  updateIncomeCategorySchema,
  idParamSchema,
  getAllIncomeQuerySchema,
} from "../zod/income.zod.js";
import { validate } from "../../../middleware/validate.js";

const router = Router();


// Generate Code
router.get(
  "/generateIncomeCode",
  verifyEmployeeToken,
  incomeCategoryControllers.generateIncomeCode
);

// CREATE
router.post(
  "/createIncomeCategory",
  verifyEmployeeToken,
  validate(createIncomeCategorySchema),
  incomeCategoryControllers.createIncomeCategory
);

// GET ALL
router.get(
  "/getAllincomecategory",
  verifyEmployeeToken,
  validate(getAllIncomeQuerySchema, "query"),
  incomeCategoryControllers.getAllincomecategory
);

// GET BY ID
router.get(
  "/getIncomeCategoryById/:id",
  verifyEmployeeToken,
  validate(idParamSchema, "params"),
  incomeCategoryControllers.getIncomeCategoryById
);

// UPDATE
router.put(
  "/updateIncomeCategory/:id",
  verifyEmployeeToken,
  validate(idParamSchema, "params"),
  validate(updateIncomeCategorySchema),
  incomeCategoryControllers.updateIncomeCategory
);

// DELETE
router.delete(
  "/deleteIncomeCategory/:id",
  verifyEmployeeToken,
  validate(idParamSchema, "params"),
  incomeCategoryControllers.deleteIncomeCategory
);
export default router;
