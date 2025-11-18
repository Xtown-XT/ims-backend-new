import {Router } from "express";
import stockadjustmentController from "../controller/stockadjustment.controller.js";
import { verifyToken, authorizeRole } from "../../../middleware/index.js";
import { validate } from "../../../middleware/validate.js";
import {
    createStockAdjustmentSchema,
    updateStockAdjustmentSchema,
    stockAdjustmentIdSchema,    
} from "../dto/stockadjustment.dto.js";

const router = Router();

// Public / Authenticated routes
router.post(
    "/stockadjustment/create",
    verifyToken,
    authorizeRole(["admin", "superadmin", "user"]),
    validate(createStockAdjustmentSchema),
    stockadjustmentController.createStockAdjustment
);

router.get(
    "/stockadjustment/all",
    verifyToken,
    authorizeRole(["admin", "superadmin", "user"]),
    stockadjustmentController.getAllStockAdjustments
);

router.get(
    "/stockadjustment/:id",
    verifyToken,
    authorizeRole(["admin", "superadmin", "user"]),
    validate(stockAdjustmentIdSchema),
    stockadjustmentController.getStockAdjustmentById
);

router.put(
    "/stockadjustment/:id",
    verifyToken,
    authorizeRole(["admin", "superadmin", "user"]),
    validate(stockAdjustmentIdSchema),
    validate(updateStockAdjustmentSchema),
    stockadjustmentController.updateStockAdjustment
);

router.delete(
    "/stockadjustment/:id",
    verifyToken,
    authorizeRole(["admin", "superadmin", "user"]),
    validate(stockAdjustmentIdSchema),
    stockadjustmentController.deleteStockAdjustment
);

export default router;