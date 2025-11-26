import express from "express";
import managestockRoutes from "./managestock.routes.js";
import stockadjustmentRoutes from "../routes/stockadjustment.routes.js";
import stocktransferRoutes from "../routes/stocktransfer.routes.js";

const router = express.Router();

router.use("/managestock", managestockRoutes);
router.use("/stockadjustment", stockadjustmentRoutes);
router.use("/stocktransfer", stocktransferRoutes);

export default router;