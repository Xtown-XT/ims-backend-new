import express from "express";
import financeRoutes from "./expensescategory.routes.js";
// import expenses from "../controllers/expenses.controllers.js";

const router = express.Router();

router.use("/finance", financeRoutes);
// router.use("/expenses", expenses);

export default router;