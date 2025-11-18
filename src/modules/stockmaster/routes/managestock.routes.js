import { Router } from "express";
import managestockController from "../controller/managestock.controller.js";
import { verifyToken, authorizeRole } from "../../../middleware/index.js";
import { validate } from "../../../middleware/validate.js";
import {
    createManagestockSchema,
    updateManagestockSchema,
    managestockIdSchema,
} from "../dto/managestock.dto.js";

const router = Router();    

// Public / Authenticated routes
router.post(
    "/managestock/create",
    verifyToken,
    authorizeRole(["admin", "superadmin", "user"]),
    validate(createManagestockSchema),
    managestockController.createManageStock
);

router.get(
    "/managestock/all",
    verifyToken,
    authorizeRole(["admin", "superadmin", "user"]),
    managestockController.getAllManageStock
);

router.get(
    "/managestock/:id",
    verifyToken,
    authorizeRole(["admin", "superadmin", "user"]),
    validate(managestockIdSchema,"params"),
    managestockController.getManageStockById
);

router.put(
    "/managestock/:id",
    verifyToken,
    authorizeRole(["admin", "superadmin", "user"]),

    validate(updateManagestockSchema),
    managestockController.updateManageStock
);

router.delete(
    "/managestock/:id",
    verifyToken,
    authorizeRole(["admin", "superadmin", "user"]),
    validate(managestockIdSchema,"params"),
    managestockController.deleteManageStock
);

export default router;