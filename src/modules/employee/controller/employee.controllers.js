import path from "path";
import { sequelize } from "../../../db/index.js";
import Employee from "../models/employee.model.js";
import Role from "../models/role.model.js";
import BaseService from "../../../services/service.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
const employeeService = new BaseService(Employee);

// ============================================================
// 🔹 Create Employee
// ============================================================

export const createEmployee = async (req, res) => {
  try {
    let { username, email, phone, password, role_id } = req.body;

    // ------------------ VALIDATION ------------------
    if (!username || !email || !phone || !password) {
      return res.status(400).json({
        message: "Username, email, phone, and password are required.",
      });
    }

    // Normalize email
    email = email.trim().toLowerCase();

    // ------------------ EMAIL DUPLICATE CHECK ------------------
    // const existingEmployee = await Employee.findOne({ where: { email } });

    // if (existingEmployee) {
    //   return res.status(409).json({
    //     message: "Email already exists.",
    //   });
    // }

    // 🔍 Check for duplicate email including soft-deleted users
const existingEmployee = await Employee.findOne({
  where: { email },
  paranoid: false
});

if (existingEmployee) {
  return res.status(409).json({
    message: "Email already exists.",
  });
}

    // ------------------ PAYLOAD PREP ------------------
    const payload = {
      username,
      email, // normalized
      phone,
      password, // hashing is handled by model hook
      role_id: role_id || null,
      profile_picture: req.file ? req.file.filename : null,
      created_by: req.user?.id || "system", // audit
    };

    // ------------------ CREATE EMPLOYEE ------------------
    const newEmployee = await employeeService.create(payload);

    // ------------------ RESPONSE ------------------
    return res.status(201).json({
      message: "Employee created successfully",
      data: newEmployee,
    });

  } catch (error) {
    // console.error("❌ Error creating employee:", error);
    // return res.status(500).json({
    //   message: "Failed to create employee",
    //   error: error.message,
    // });

    if (error.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({
      message: "Email already exists.",
    });
  }

  return res.status(500).json({
    message: "Failed to create employee",
    error: error.message,
  });
  }
};

// ============================================================
// 🔹 Update Employee
// ============================================================
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const payload = {
      ...req.body,
      updated_by: req.user?.id || "system",
    };

    if (req.file) {
      payload.profile_picture = req.file.filename;
    }

    // ✅ Hash password if it's changed
    if (payload.password) {
      payload.password = await bcrypt.hash(payload.password, 10);
    }

    const updatedEmployee = await employeeService.update(id, payload);

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(200).json({
      message: "Employee updated successfully",
      data: updatedEmployee,
    });
  } catch (error) {
    console.error("❌ Error updating employee:", error);
    return res.status(500).json({
      message: "Failed to update employee",
      error: error.message,
    });
  }
};

// ============================================================
// 🔹 Get All Employees
// ============================================================
export const getAllEmployees = async (req, res) => {
  try {
    const {
      search = "",
      page = 1,
      limit = 10,
      orderBy = "createdAt",
      order = "ASC",
    } = req.query;

    const offset = (page - 1) * limit;

    const whereClause = search
      ? {
          [sequelize.Op.or]: [
            { username: { [sequelize.Op.like]: `%${search}%` } },
            { email: { [sequelize.Op.like]: `%${search}%` } },
            { phone: { [sequelize.Op.like]: `%${search}%` } },
          ],
        }
      : {};

    const { rows, count } = await Employee.findAndCountAll({
      where: whereClause,
      include: [
        { model: Role, as: "role", attributes: ["id", "role_name"] },
      ],
      order: [[orderBy, order]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const formattedRows = rows.map((emp) => ({
      ...emp.toJSON(),
      profile_picture: emp.profile_picture
        ? `${baseUrl}/uploads/employees/${emp.profile_picture}`
        : null,
    }));

    return res.status(200).json({
      message: "Employees fetched successfully",
      data: formattedRows,
      total: count,
      page: parseInt(page),
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    console.error("❌ Error fetching employees:", error);
    return res.status(500).json({
      message: "Failed to fetch employees",
      error: error.message,
    });
  }
};

// ============================================================
// 🔹 Get Employee by ID
// ============================================================
export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findOne({
      where: { id },
      include: [
        { model: Role, as: "role", attributes: ["id", "role_name"] },
      ],
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const employeeData = {
      ...employee.toJSON(),
      profile_picture: employee.profile_picture
        ? `${baseUrl}/uploads/employees/${employee.profile_picture}`
        : null,
    };

    return res.status(200).json({
      message: "Employee fetched successfully",
      data: employeeData,
    });
  } catch (error) {
    console.error("❌ Error fetching employee:", error);
    return res.status(500).json({
      message: "Failed to fetch employee",
      error: error.message,
    });
  }
};

// ============================================================
// 🔹 Delete Employee
// ============================================================
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await employeeService.delete(id);

    if (!result) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting employee:", error);
    return res.status(500).json({
      message: "Failed to delete employee",
      error: error.message,
    });
  }
};

// ============================================================
// 🔹 Employee Login
// ============================================================
export const emplogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const employee = await Employee.findOne({ where: { username } });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        id: employee.id,
        username: employee.username,
        role: employee.role_id,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: employee.id,
        username: employee.username,
        email: employee.email,
        role_id: employee.role_id,
      },
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

// ============================================================
// 🔹 Employee Logout
// ============================================================
export const emplogout = async (req, res) => {
  try {
    // JWT is stateless, but we can instruct frontend to remove it
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============================================================
// 🔹 Get Logged-In Employee Profile
// ============================================================
export const getEmpProfile = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.user.id, {
      attributes: ["id", "username", "email", "phone", "role_id"],
      include: [{ model: Role, as: "role", attributes: ["role_name"] }],
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ data: employee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export default {
  createEmployee,
  updateEmployee,
  getAllEmployees,
  getEmployeeById,
  deleteEmployee,
  emplogin,
  emplogout,
  getEmpProfile

};
