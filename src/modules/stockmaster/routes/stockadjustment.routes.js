import {Router } from "express";
import stockadjustmentController from "../controller/stockadjustment.controller.js";

import { validate } from "../../../middleware/validate.js";
import {
    createStockAdjustmentSchema,
    updateStockAdjustmentSchema,
    stockAdjustmentIdSchema,    
} from "../dto/stockadjustment.dto.js";
import { verifyEmployeeToken } from "../../../middleware/empAuth.js";

const router = Router();

// Public / Authenticated routes
router.post(
    "/createStockAdjustment", verifyEmployeeToken,
    
    validate(createStockAdjustmentSchema),
    stockadjustmentController.createStockAdjustment
);

router.get(
    "/getAllStockAdjustments",
    verifyEmployeeToken,
    stockadjustmentController.getAllStockAdjustments
);

router.get(
    "/getStockAdjustmentById/:id",
   verifyEmployeeToken,
    validate(stockAdjustmentIdSchema),
    stockadjustmentController.getStockAdjustmentById
);

router.put(
    "/updateStockAdjustment/:id",
   verifyEmployeeToken,
    validate(stockAdjustmentIdSchema),
    validate(updateStockAdjustmentSchema),
    stockadjustmentController.updateStockAdjustment
);

router.delete(
    "/deleteStockAdjustment/:id",
   verifyEmployeeToken,
    validate(stockAdjustmentIdSchema),
    stockadjustmentController.deleteStockAdjustment
);

export default router;