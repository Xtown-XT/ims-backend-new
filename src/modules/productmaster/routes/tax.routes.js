// src/modules/taxmaster/routes/tax.routes.js

import express from "express";
import {
  createtax,
  getalltax,
  getById,
  update,
  softDelete,
  restore,
} from "../controller/tax.controllers.js";
import {  verifyEmployeeToken,validate, uploadSingle} from "../../../middleware/index.js";
import { createTaxSchema, updateTaxSchema } from "../dto/tax.zod.js";


const router = express.Router();

// -------------------------
// 📌 Create Tax
// -------------------------
router.post(
  "/createtax",
  verifyEmployeeToken,
  validate(createTaxSchema),
  createtax
);

// -------------------------
// 📌 Get All Taxes
// -------------------------
router.get(
  "/getalltax",
 verifyEmployeeToken,
  getalltax
);

// -------------------------
// 📌 Get Single Tax by ID
// -------------------------
router.get(
  "/getbyid/:id",
 verifyEmployeeToken,
  getById
);

// -------------------------
// 📌 Update Tax
// -------------------------
router.put(
  "/update/:id",
 verifyEmployeeToken,
  validate(updateTaxSchema),
  update
);

// -------------------------
// 📌 Soft Delete Tax
// -------------------------
router.patch(
  "/softdelete/:id",
 verifyEmployeeToken,
  softDelete
);

// -------------------------
// 📌 Restore Soft Deleted Tax
// -------------------------
router.patch(
  "/restore/:id",
  verifyEmployeeToken,
  restore
);

export default router;
