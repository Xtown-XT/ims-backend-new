import {Router} from "express";
import {  verifyEmployeeToken,validate, uploadSingle} from "../../../middleware/index.js";
import { createVariant, deleteVariant, getAllvariants, getvariantById, updatevariant } from "../controller/varrient.controllers.js";
import { variantIdSchema, variantSchema, variantUpdateSchema, } from "../dto/varrient.dto.js";





const router = Router();

router.post("/createVariant",verifyEmployeeToken,validate( variantSchema ), createVariant);
router.get("/getAllvariants",verifyEmployeeToken, getAllvariants);
router.put("/updatevariant/:id",verifyEmployeeToken,   updatevariant);validate(variantUpdateSchema)
router.delete("/deleteVariant/:id",verifyEmployeeToken, deleteVariant);
router.get ("/getvariantById/:id",verifyEmployeeToken,validate(variantIdSchema), getvariantById);



export default router