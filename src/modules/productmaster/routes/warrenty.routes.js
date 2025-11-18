import { Router } from "express";
import {
  createWarranty,
  getAllWarranties,
  getWarrantyById,
  updateWarranty,
  deleteWarranty,
} from "../controller/warrenty.controllers.js";

import { warrantySchema, warrantyUpdateSchema } from "../dto/warrenty.dto.js";
import {  verifyEmployeeToken,validate, uploadSingle} from "../../../middleware/index.js";

const router = Router();

// 🟢 Create new warranty
router.post("/createWarranty",verifyEmployeeToken, validate(warrantySchema), createWarranty);

// // 🔵 Get all warranties
router.get("/getAllWarranties",verifyEmployeeToken,getAllWarranties);

// // 🟣 Get warranty by ID
router.get("/getWarrantyById/:id",verifyEmployeeToken, getWarrantyById);

// // 🟠 Update warranty
router.put("/updateWarranty/:id",verifyEmployeeToken, validate(warrantyUpdateSchema), updateWarranty);

// // 🔴 Delete warranty
router.delete("/deleteWarranty/:id",verifyEmployeeToken, deleteWarranty);

export default router;
