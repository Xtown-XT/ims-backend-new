import express from "express";
import purchaseRoutes from "./purchase.routes.js";
const router = express.Router();

router.use('/purchase', purchaseRoutes);

export default router;