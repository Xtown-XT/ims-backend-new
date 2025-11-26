import Router from "express"
import  createCupon, { getAllCupons }  from "../controllers/cuponcontrollers.js";
import { validate } from "../../../middleware/validate.js";
import { createCuponSchema, cuponIdSchema, updateCuponSchema } from "../dto/cupon.zod.js";
import { verifyEmployeeToken } from "../../../middleware/empAuth.js";



const router = Router();

router.post("/createCupon",verifyEmployeeToken,     validate(createCuponSchema) ,  createCupon.createCupon);
router.get("/getAllCupons",  verifyEmployeeToken,validate(getAllCupons),  createCupon.getAllCupons);
router.get("/getCuponById/:id",verifyEmployeeToken, validate(cuponIdSchema),      createCupon.getCuponById);
router.put("/updateCupon/:id",  verifyEmployeeToken,validate(cuponIdSchema),      
  validate(updateCuponSchema),verifyEmployeeToken, createCupon.updateCupon);
router.delete("/deleteCupon/:id",verifyEmployeeToken, validate(cuponIdSchema),  createCupon.deleteCupon);

export default router