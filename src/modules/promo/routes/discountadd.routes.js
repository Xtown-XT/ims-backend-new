import { Router } from "express";
import adddiscountcontroller from "../controllers/discountadd.controllers.js";
import { verifyEmployeeToken } from "../../../middleware/empAuth.js";

const router = Router();

router.post("/Discountcreate",
     verifyEmployeeToken,
     adddiscountcontroller.createDiscount);
router.get("/getAllDiscounts",
     verifyEmployeeToken,
     adddiscountcontroller.getAllDiscounts);
router.get("/getDiscountById/:id",
      verifyEmployeeToken, 
     adddiscountcontroller.getDiscountById);
router.put("/updateDiscount/:id",
      verifyEmployeeToken,
      adddiscountcontroller.updateDiscount);
router.delete("/deleteDiscount/:id",
      verifyEmployeeToken,
      adddiscountcontroller.deleteDiscount);

export default router;
