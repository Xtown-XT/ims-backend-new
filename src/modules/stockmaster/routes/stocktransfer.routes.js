import { Router } from "express";
import stocktransferController from "../controller/stocktransfer.controller.js";
import { validate } from "../../../middleware/validate.js";
import {
    createStocktransferSchema,
    updateStocktransferSchema,
     stocktransferIdSchema,
} from "../dto/stocktransfer.dto.js";
import { verifyEmployeeToken } from "../../../middleware/empAuth.js";

const router = Router();

// Public / Authenticated routes
router.post(
    "/createStockTransfer",
    verifyEmployeeToken,
    validate(createStocktransferSchema),
    
    
    stocktransferController.createStockTransfer
);

router.get(
    "/getAllStockTransfers",
    verifyEmployeeToken,
    stocktransferController.getAllStockTransfers
);

router.get(
    "/getStockTransferById/:id",
    verifyEmployeeToken,
    validate( stocktransferIdSchema),
    stocktransferController.getStockTransferById
);

router.put(
    "/updateStockTransfer/:id",
    verifyEmployeeToken,
    validate( stocktransferIdSchema),
    validate(updateStocktransferSchema),
    stocktransferController.updateStockTransfer
);

router.delete(
    "/deleteStockTransfer/:id",
  verifyEmployeeToken,
    validate( stocktransferIdSchema),
    stocktransferController.deleteStockTransfer
);

export default router;