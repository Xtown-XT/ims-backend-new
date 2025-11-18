import { Router } from "express";
import {  verifyEmployeeToken,validate, uploadSingle} from "../../../middleware/index.js";
import {
  warehouseSchema,
  warehouseUpdateSchema,
} from "../dto/warehouse.dto.js";
import {
  createwarehouse,
  deletewarehouse,
  getAllwarehouse,
  getwarehouseByid,
  updatewarehouse,
} from "../controller/warehouse.controllers.js";

const router = Router();

/**
 * 🏗️ Create warehouse
 */
router.post(
  "/createwarehouse",
verifyEmployeeToken,
  validate(warehouseSchema),
  createwarehouse
);

/**
 * 📦 Get all warehouses
 */
router.get(
  "/getAllwarehouse",
verifyEmployeeToken,
  getAllwarehouse
);

/**
 * 🔍 Get warehouse by ID
 */
router.get(
  "/getwarehouseByid/:id",
verifyEmployeeToken,
  getwarehouseByid // ✅ removed unnecessary validation
);

/**
 * ✏️ Update warehouse by ID
 */
router.put(
  "/updatewarehouse/:id",
verifyEmployeeToken,
  validate(warehouseUpdateSchema),
  updatewarehouse
);

/**
 * 🗑️ Delete warehouse by ID
 */
router.delete(
  "/deletewarehouse/:id",
verifyEmployeeToken,
  deletewarehouse
);

export default router;
