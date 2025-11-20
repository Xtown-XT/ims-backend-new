import express from "express";
import  financeRoutes from "./expensescategory.routes.js";
import  expensesRoutes from "./expenses.route.js";

const router = express.Router();

router.use("/finance", financeRoutes);
router.use("/expenses", expensesRoutes);

export default router;