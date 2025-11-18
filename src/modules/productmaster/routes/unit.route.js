import { Router } from "express";
import unitController from "../controller/unit.controller.js";
import {  verifyEmployeeToken,validate, uploadSingle} from "../../../middleware/index.js";

import {
  createUnitSchema,
  updateUnitSchema,
  unitIdSchema,
} from "../dto/unit.zod.js";

const router = Router();

// ✅ Create
router.post(
  "/create",
 verifyEmployeeToken,
  validate(createUnitSchema),
  unitController.createUnit
);

// ✅ Get All
router.get(
  "/all",
  verifyEmployeeToken,
  unitController.getAllUnits
);

// ✅ Get by ID
router.get(
  "/:id",
 verifyEmployeeToken,
  validate(unitIdSchema, "params"),
  unitController.getUnitById
);

// ✅ Update
router.put(
  "/:id",
 verifyEmployeeToken,
  validate(updateUnitSchema),
  unitController.updateUnit
);

// ✅ Delete
router.delete(
  "/:id",
  verifyEmployeeToken,
  validate(unitIdSchema, "params"),
  unitController.deleteUnit
);

export default router;
