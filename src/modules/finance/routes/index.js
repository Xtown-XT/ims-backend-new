import express from "express";
import financeRoutes from "./finance.routes.js";

const router = express.Router();

router.use("/finance", financeRoutes);

export default router;