import express from "express";
import purchaseController from "../controllers/purchaseController.js";
import {  verifyEmployeeToken,validate} from "../../../middleware/index.js";
import { createPurchaseSchema, updatePurchaseSchema, idSchema } from "../dto/purchase.zod.js";

const router = express.Router();

router.post("/createPurchase",verifyEmployeeToken,validate(createPurchaseSchema), purchaseController.createPurchase);
router.get("/getAllPurchases",verifyEmployeeToken, purchaseController.getAllPurchases);
router.get("/getPurchaseById/:id",verifyEmployeeToken, validate(idSchema),purchaseController.getPurchaseById);
router.put("/updatePurchase/:id",verifyEmployeeToken, validate(updatePurchaseSchema),purchaseController.updatePurchase);
router.delete("/deletePurchase/:id",verifyEmployeeToken,validate(idSchema), purchaseController.deletePurchase);
router.put("/restorePurchase/:id",verifyEmployeeToken,validate(idSchema), purchaseController.restorePurchase);

export default router;
