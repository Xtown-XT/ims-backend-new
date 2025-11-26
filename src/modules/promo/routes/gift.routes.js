import Router from "express";
import giftcontrollers from "../controllers/giftcontrollers.js";
import { verifyEmployeeToken } from "../../../middleware/empAuth.js";
import { validate } from "../../../middleware/validate.js";
import { createGiftCardSchema, giftCardIdSchema, updateGiftCardSchema } from "../dto/gift.zod.js";
import { verifyToken } from "../../../middleware/auth.js";
import { authorizeRole } from "../../../middleware/authenticateRole.js";






const router = Router();
router.post("/creategiftcard",verifyEmployeeToken,verifyToken,authorizeRole(["admin", "superadmin", "hr", "manager"]), validate(createGiftCardSchema),giftcontrollers.creategiftcard)
router.get("/getAllgiftcards",giftcontrollers.getAllgiftcards)
router.get("/getgiftcardById/:id",giftcontrollers.getgiftcardById)
router.put("/updategiftcard/:id",verifyEmployeeToken,validate(updateGiftCardSchema), giftcontrollers.updategiftcard)
router.delete("/deletegiftcard/:id",verifyEmployeeToken,validate(giftCardIdSchema),   giftcontrollers.deletegiftcard)




export default router