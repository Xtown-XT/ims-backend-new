import { Router } from "express";
import categoryController from "../controller/categories.controller.js";
import {  verifyEmployeeToken,validate, uploadSingle} from "../../../middleware/index.js";
import {  } from "../../../middleware/validate.js";

import {
  createCategorySchema,
  updateCategorySchema,
  categoryIdSchema,
} from "../dto/categories.zod.js";


const router = Router();

// Public / Authenticated routes
router.post(
  "/createCategory",
verifyEmployeeToken,
  validate(createCategorySchema),
  categoryController.createCategory
);

router.get(
  "/getAllCategories",
  verifyEmployeeToken,
  categoryController.getAllCategories
);

// Protected routes (by ID)
router.get(
  "/getCategoryById/:id",
 verifyEmployeeToken,
  validate(categoryIdSchema, "params"),
  categoryController.getCategoryById
);

router.put(
  "/updateCategory/:id",
 verifyEmployeeToken,
  validate(updateCategorySchema),
  categoryController.updateCategory
);

router.delete(
  "/deleteCategory/:id",
  verifyEmployeeToken,
  validate(categoryIdSchema, "params"),
  categoryController.deleteCategory
);

export default router;
