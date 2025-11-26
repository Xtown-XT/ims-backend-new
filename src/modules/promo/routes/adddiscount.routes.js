import { Router } from "express";
import discountcontrollers from "../controllers/add.discountplan.controllers.js";
import { verifyEmployeeToken } from "../../../middleware/empAuth.js";
import { validate } from "../../../middleware/validate.js";
import { createDiscountSchema, discountIdSchema, updateDiscountSchema } from "../dto/add.discount.zod.js";

const router = Router();

router.post("/createDiscountplan", verifyEmployeeToken, validate(createDiscountSchema), discountcontrollers.createDiscountplan);
router.get("/getAllDiscountsplan",verifyEmployeeToken, discountcontrollers.getAllDiscountsplan);
router.get("/getDiscountByIdplan/:id",verifyEmployeeToken,validate(discountIdSchema), discountcontrollers.getDiscountByIdplan);
router.put("/updateDiscountplan/:id",verifyEmployeeToken,validate(updateDiscountSchema), discountcontrollers.updateDiscountplan);
router.delete("/deleteDiscountplan/:id",verifyEmployeeToken,validate(discountIdSchema), discountcontrollers.deleteDiscountplan);

export default router;
