import { Router } from "express";
import  productController  from "../controller/product.controller.js";
import {  verifyEmployeeToken,validate, uploadMultiple} from "../../../middleware/index.js";
import {
  createProductSchema,
  updateProductSchema,
  idSchema,
} from "../../productmaster/dto/product.zod.js";

const router = Router();
/**
 * 
 * GET /api/sku/generate?storeId=...&categoryId=...
 * Response { sku: "FM-PH-000123" }
 */
router.get("/generate",  verifyEmployeeToken, productController.generateSKUController);

router.post(
  "/createFullProduct",
  uploadMultiple("images", "products" , 10),  // multiple images
  verifyEmployeeToken,
   validate(createProductSchema),
  productController.createFullProduct
);

// GET All Products
router.get("/getAllProducts", verifyEmployeeToken, productController.getAllProducts);

// GET Product by ID
router.get("/getProductById/:id", verifyEmployeeToken, validate(idSchema), productController.getProductById);

// DELETE Product (if required)
router.delete("/deleteProduct/:id", verifyEmployeeToken,  validate(idSchema),productController.deleteProduct);

// UPDATE Product (optional)
router.put("/updateProduct/:id", 
  uploadMultiple("images", "products" , 10),  // multiple images
  verifyEmployeeToken, 
  validate(updateProductSchema), 
  productController.updateProduct);


export default router;
