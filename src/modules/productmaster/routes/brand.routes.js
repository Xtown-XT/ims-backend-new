import { Router } from "express";
import brandController from "../controller/brand.controller.js";
import {  verifyEmployeeToken,validate, uploadSingle} from "../../../middleware/index.js";
import { createBrandSchema, updateBrandSchema, brandIdSchema } from "../dto/brand.zod.js";

const router = Router();

// Create Brand (authenticated + file upload)
router.post(
  "/createBrand",
 verifyEmployeeToken,
  uploadSingle("image", "brands"),
  validate(createBrandSchema),
  brandController.createBrand
);

// Get all brands (with pagination / search)
router.get(
  "/getAllBrands",
 verifyEmployeeToken,
  brandController.getAllBrands
);

// Get one brand by id
router.get(
  "/getBrandById/:id",
 verifyEmployeeToken,
  validate(brandIdSchema),
  brandController.getBrandById
);

// Update brand (allow upload)
router.put(
  "/updateBrand/:id",
 verifyEmployeeToken,
  uploadSingle("image", "brands"), // handle optional file
  validate(brandIdSchema),
  validate(updateBrandSchema),
  brandController.updateBrand
);

// Delete brand
router.delete(
  "/deleteBrand/:id",
 verifyEmployeeToken,
  validate(brandIdSchema),
  brandController.deleteBrand
);

export default router;

