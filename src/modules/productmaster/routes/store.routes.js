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
  "/createStore",
  verifyEmployeeToken,
  validate(createStoreSchema),
  storeController.createStore
);

// ✅ Get All Stores
router.get(
  "/getAllStores",
 verifyEmployeeToken,
  storeController.getAllStores
);

// ✅ Get Store by ID
router.get(
  "/getStoreById/:id",
verifyEmployeeToken,
  validate(storeIdSchema, "params"),
  storeController.getStoreById
);

// ✅ Update Store
router.put(
  "/updateStore/:id",
 verifyEmployeeToken,
  validate(updateStoreSchema),
  storeController.updateStore
);

// ✅ Delete Store
router.delete(
  "/deleteStore/:id",
 verifyEmployeeToken,
  validate(storeIdSchema, "params"),
  storeController.deleteStore
);

export default router;
