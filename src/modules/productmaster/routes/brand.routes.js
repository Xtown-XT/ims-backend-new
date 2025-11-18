import { Router } from "express";
import brandController from "../controller/brand.controller.js";
import {  verifyEmployeeToken,validate, uploadSingle} from "../../../middleware/index.js";
import { createBrandSchema, updateBrandSchema, brandIdSchema } from "../dto/brand.zod.js";

const router = Router();

// Create Brand (authenticated + file upload)
router.post(
  "/brands/create",
 verifyEmployeeToken,
  uploadSingle("image", "brands"),
  validate(createBrandSchema),
  brandController.createBrand
);

// Get all brands (with pagination / search)
router.get(
  "/brands/all",
 verifyEmployeeToken,
  brandController.getAllBrands
);

// Get one brand by id
router.get(
  "/brands/:id",
 verifyEmployeeToken,
  validate(brandIdSchema),
  brandController.getBrandById
);

// Update brand (allow upload)
router.put(
  "/brands/:id",
 verifyEmployeeToken,
  uploadSingle("image", "brands"), // handle optional file
  validate(brandIdSchema),
  validate(updateBrandSchema),
  brandController.updateBrand
);

// Delete brand
router.delete(
  "/brands/:id",
 verifyEmployeeToken,
  validate(brandIdSchema),
  brandController.deleteBrand
);

export default router;

