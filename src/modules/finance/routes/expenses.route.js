import{Router} from "express";

import expensescontrollers from "../controllers/expenses.controllers.js";

const router = Router();

router.get("/getAllexpenses",expensescontrollers.getAllexpenses);
router.get("/getExpenseById/:id",expensescontrollers.getExpenseById);
// router.post("/createexpenses",expensescontrollers.createexpenses);
router.put("/updateexpenses/:id",expensescontrollers.updateexpenses);
// router.delete("/deleteexpenses/:id",expensescontrollers.deleteexpenses);

export default router