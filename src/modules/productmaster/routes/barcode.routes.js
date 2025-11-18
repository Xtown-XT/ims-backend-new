import { Router } from "express";
// import { createBarcode, deleteBarcode, getAllBarcodes, getBarcodeById } from "../controller/barcode.controller.js";
import barcodeController, { getAllBarcodes } from "../controller/barcode.controller.js";
import { verifyEmployeeToken } from "../../../middleware/empAuth.js";
import { validate } from "../../../middleware/validate.js";
import { barcodeSchema } from "../dto/barcode.zod.js";
import brandController from "../controller/brand.controller.js";
// import { verifyEmployeeToken, validate } from "../../../middleware/index.js";


const router = Router();

router.post(
  "/createBarcode",
 verifyEmployeeToken,validate(barcodeSchema),
  barcodeController.createBarcode
);

router.get(
  "/getAllBarcodes",
  verifyEmployeeToken,barcodeController. 
getAllBarcodes);
// );
router.get(
  "/getBarcodeById/:id",
  verifyEmployeeToken,barcodeController.
  getBarcodeById
);

router.delete(
  "/deleteBarcode/:id",
  verifyEmployeeToken,barcodeController.
 deleteBarcode
  );

export default router;
