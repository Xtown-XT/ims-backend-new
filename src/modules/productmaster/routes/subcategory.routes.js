
import { Router } from "express";
import subcategoryController from "../controller/subcategory.controller.js";
import {  verifyEmployeeToken,validate, uploadSingle} from "../../../middleware/index.js";

import {
  createSubcategorySchema,
  updateSubcategorySchema,
  subcategoryIdSchema,
} from "../dto/subcategory.zod.js";

const router = Router();

// NOTE: order matters: verifyToken -> authorizeRole -> uploadSingle -> validate -> controller
router.post(
  "/subcategories/create",
 verifyEmployeeToken,
  uploadSingle("image", "subcategories"), // multer runs here and populates req.file and req.body
  validate(createSubcategorySchema),
  subcategoryController.createSubcategory
);

router.get(
  "/subcategories/all",
 verifyEmployeeToken,
  subcategoryController.getAllSubcategories
);

router.get(
  "/subcategories/:id",
 verifyEmployeeToken,
  validate(subcategoryIdSchema),
  subcategoryController.getSubcategoryById
);

router.put(
  "/subcategories/:id",
 verifyEmployeeToken,
  uploadSingle("image", "subcategories"), // multer runs here and populates req.file and req.body
  validate(subcategoryIdSchema),
  validate(updateSubcategorySchema),
  subcategoryController.updateSubcategory
);

router.delete(
  "/subcategories/:id",
 verifyEmployeeToken,
  validate(subcategoryIdSchema),
  subcategoryController.deleteSubcategory
);

export default router;
