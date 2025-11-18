import jwt from "jsonwebtoken";
import Employee from "../modules/employee/models/employee.model.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export const verifyEmployeeToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    // Fetch user info from DB
    const employee = await Employee.findByPk(decoded.id, {
      attributes: ["id", "username", "email", "phone", "role_id", "profile_picture"],
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    req.user = employee; // attach to request for next handler
    next();
  } catch (error) {
    console.error("❌ Token validation error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
