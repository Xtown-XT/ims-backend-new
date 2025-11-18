// src/modules/index.js
import express from "express";
import employeeRoutes from "./employee.route.js";
import roleRoute from "./role.routes.js";

const router = express.Router();

router.use("/employee", employeeRoutes);
router.use("/role", roleRoute);

export default router;
