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
  "/categories/create",
verifyEmployeeToken,
  validate(createCategorySchema),
  categoryController.createCategory
);

router.get(
  "/categories/all",
  verifyEmployeeToken,
  categoryController.getAllCategories
);

// Protected routes (by ID)
router.get(
  "/categories/:id",
 verifyEmployeeToken,
  validate(categoryIdSchema, "params"),
  categoryController.getCategoryById
);

router.put(
  "/categories/:id",
 verifyEmployeeToken,
  validate(updateCategorySchema),
  categoryController.updateCategory
);

router.delete(
  "/categories/:id",
  verifyEmployeeToken,
  validate(categoryIdSchema, "params"),
  categoryController.deleteCategory
);

export default router;
