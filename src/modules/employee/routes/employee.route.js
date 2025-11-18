// src/modules/employee/routes/employee.routes.js
import { Router } from "express";
import employeeController from "../controller/employee.controllers.js";
import { verifyToken, authorizeRole } from "../../../middleware/index.js";
import {  verifyEmployeeToken } from "../../../middleware/empAuth.js";
import { validate } from "../../../middleware/validate.js";
import { uploadSingle } from "../../../middleware/upload.js";
import {
  createEmployeeSchema,
  updateEmployeeSchema,
  idSchema,
} from "../dto/employee.zod.js";

const router = Router();

// CREATE
router.post(
  "/createEmployee",
  verifyToken,
  authorizeRole(["admin", "superadmin", "hr"]),
  uploadSingle("profile_picture", "employees"),
  validate(createEmployeeSchema),
  employeeController.createEmployee
);

// GET ALL
router.get(
  "/getAllEmployees",
  verifyToken,
  authorizeRole(["admin", "superadmin", "hr", "manager"]),
  employeeController.getAllEmployees
);

// GET BY ID
router.get(
  "/getEmployeeById/:id",
  verifyToken,
  authorizeRole(["admin", "superadmin", "hr", "manager"]),
  validate(idSchema, "params"),
  employeeController.getEmployeeById
);

// UPDATE
router.put(
  "/updateEmployee/:id",
  verifyToken,
  authorizeRole(["admin", "superadmin", "hr"]),
 uploadSingle("profile_picture", "employees"),
  validate(updateEmployeeSchema),
  employeeController.updateEmployee
);

// DELETE
router.delete(
  "/deleteEmployee/:id",
  verifyToken,
  authorizeRole(["admin", "superadmin"]),
  validate(idSchema, "params"),
  employeeController.deleteEmployee
);


/* ============================================================
   🔹 AUTH ROUTES (Login / Logout / Profile)
   ============================================================ */

// 🟢 Login (public)
router.post("/login", employeeController.emplogin);

// 🔴 Logout (protected)
router.post("/logout", verifyEmployeeToken, employeeController.emplogout);

// 👤 Get logged-in employee profile
router.get("/profile", verifyEmployeeToken, employeeController.getEmpProfile);

export default router;
