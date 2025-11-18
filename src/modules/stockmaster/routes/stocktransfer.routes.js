import { Router } from "express";
import stocktransferController from "../controller/stocktransfer.controller.js";
import { verifyToken, authorizeRole } from "../../../middleware/index.js";
import { validate } from "../../../middleware/validate.js";
import {
    createStocktransferSchema,
    updateStocktransferSchema,
     stocktransferIdSchema,
} from "../dto/stocktransfer.dto.js";

const router = Router();

// Public / Authenticated routes
router.post(
    "/stocktransfer/create",
    verifyToken,
    authorizeRole(["admin", "superadmin", "user"]),
    validate(createStocktransferSchema),
    stocktransferController.createStockTransfer
);

router.get(
    "/stocktransfer/all",
    verifyToken,
    authorizeRole(["admin", "superadmin", "user"]),
    stocktransferController.getAllStockTransfers
);

router.get(
    "/stocktransfer/:id",
    verifyToken,
    authorizeRole(["admin", "superadmin", "user"]),
    validate( stocktransferIdSchema),
    stocktransferController.getStockTransferById
);

router.put(
    "/stocktransfer/:id",
    verifyToken,
    authorizeRole(["admin", "superadmin", "user"]),
    validate( stocktransferIdSchema),
    validate(updateStocktransferSchema),
    stocktransferController.updateStockTransfer
);

router.delete(
    "/stocktransfer/:id",
    verifyToken,
    authorizeRole(["admin", "superadmin", "user"]),
    validate( stocktransferIdSchema),
    stocktransferController.deleteStockTransfer
);

export default router;