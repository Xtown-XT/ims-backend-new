import express from "express";
import financeRoutes from "./expensescategory.routes.js";
import expensesRoutes from "./expenses.routes.js";
import incomeRoutes from "./incomecategory.routes.js";
import addincomeRoutes from "./income.routes.js"

const router = express.Router();

router.use("/finance", financeRoutes);
router.use("/expenses", expensesRoutes);
router.use("/income", incomeRoutes);
router.use("/addincome", addincomeRoutes)

export default router;
