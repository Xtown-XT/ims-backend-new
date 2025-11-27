
import { Router } from "express";
import subcategoryController from "../controller/subcategory.controllers.js";
import {  verifyEmployeeToken, uploadSingle, validate} from "../../../middleware/index.js";

import {
  createSubcategorySchema,
  updateSubcategorySchema,
  subcategoryIdSchema,
} from "../dto/subcatergory.zod.js";

const router = Router();

// NOTE: order matters: verifyToken -> authorizeRole -> uploadSingle -> validate -> controller
router.post(
  "/createSubcategory",
 verifyEmployeeToken,
  uploadSingle("image", "subcategories"), // multer runs here and populates req.file and req.body
  validate(createSubcategorySchema),
  subcategoryController.createSubcategory
);

router.get(
  "/getAllSubcategories",
 verifyEmployeeToken,
  subcategoryController.getAllSubcategories
);

router.get(
  "/getSubcategoryById/:id",
 verifyEmployeeToken,
  validate(subcategoryIdSchema),
  subcategoryController.getSubcategoryById
);

router.put(
  "/updateSubcategory/:id",
 verifyEmployeeToken,
  uploadSingle("image", "subcategories"), // multer runs here and populates req.file and req.body
  validate(subcategoryIdSchema),
  validate(updateSubcategorySchema),
  subcategoryController.updateSubcategory
);

router.delete(
  "/deleteSubcategory/:id",
 verifyEmployeeToken,
  validate(subcategoryIdSchema),
  subcategoryController.deleteSubcategory
);

export default router;
