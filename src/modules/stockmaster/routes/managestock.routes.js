import { Router } from "express";
import managestockController from "../controller/managestock.controller.js";
import { validate } from "../../../middleware/validate.js";
import {
    createManagestockSchema,
    updateManagestockSchema,
    managestockIdSchema,
} from "../dto/managestock.dto.js";
import { verifyEmployeeToken } from "../../../middleware/empAuth.js";

const router = Router();    

// Public / Authenticated routes
router.post(
    "/createManageStock",
    verifyEmployeeToken,
    
    validate(createManagestockSchema),
    managestockController.createManageStock
);

router.get(
    "/getAllManageStock",
    verifyEmployeeToken,
    managestockController.getAllManageStock
);

router.get(
    "/getManageStockById/:id",
    verifyEmployeeToken,
    validate(managestockIdSchema,"params"),
    managestockController.getManageStockById
);

router.put(
    "/updateManageStock/:id",
   verifyEmployeeToken,

    validate(updateManagestockSchema),
    managestockController.updateManageStock
);

router.delete(
    "/deleteManageStock/:id",
   verifyEmployeeToken,
    validate(managestockIdSchema,"params"),
    managestockController.deleteManageStock
);

export default router;