import Router from "express";
import incomecontroller from "../controllers/addincome.controllers.js";
import { verifyEmployeeToken } from "../../../middleware/empAuth.js";


const router = Router();

router.post("/createIncome",verifyEmployeeToken,    incomecontroller.createIncome);


export default router;