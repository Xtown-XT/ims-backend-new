// src/modules/index.js  (or wherever your module index lives)

import express from "express";
import addcustomerRoutes from "./customer.routes.js";    // adjust path if needed
import addsupplierRoutes from "./addsuppiler.routes.js"  // <--- fixed import

const router = express.Router();

// mount module routers under /ims_api/v1/* when this router is used at /ims_api/v1
router.use("/customers", addcustomerRoutes);
router.use("/suppliers", addsupplierRoutes);

export default router;
