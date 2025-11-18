import { Router } from "express";
import storeController from "../controller/store.controller.js";
import {  verifyEmployeeToken,validate} from "../../../middleware/index.js";
import {
  createStoreSchema,
  updateStoreSchema,
  storeIdSchema,
} from "../../productmaster/dto/store.zod.js";

const router = Router();

// ✅ Create Store
router.post(
  "/store/create",
  verifyEmployeeToken,
  validate(createStoreSchema),
  storeController.createStore
);

// ✅ Get All Stores
router.get(
  "/store/all",
 verifyEmployeeToken,
  storeController.getAllStores
);

// ✅ Get Store by ID
router.get(
  "/store/:id",
verifyEmployeeToken,
  validate(storeIdSchema, "params"),
  storeController.getStoreById
);

// ✅ Update Store
router.put(
  "/store/:id",
 verifyEmployeeToken,
  validate(updateStoreSchema),
  storeController.updateStore
);

// ✅ Delete Store
router.delete(
  "/store/:id",
 verifyEmployeeToken,
  validate(storeIdSchema, "params"),
  storeController.deleteStore
);

export default router;
