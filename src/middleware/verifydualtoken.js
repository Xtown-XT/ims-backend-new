// // // middleware/verifyDualToken.js
// // import jwt from "jsonwebtoken";
// // import dotenv from "dotenv";
// // import Admin from "../modules/user/models/user.model.js";
// // import Employee from "../modules/employee/models/employee.model.js";

// // dotenv.config();
// // const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// // const ROLE_MAP = {
// //   1: "admin",
// //   2: "superadmin",
// //   3: "hr",
// //   4: "manager",
// //   5: "employee",
// // };

// // export const verifyDualToken = async (req, res, next) => {
// //   try {
// //     const header = req.headers.authorization;
// //     if (!header || !header.startsWith("Bearer ")) {
// //       return res.status(401).json({ message: "No token provided" });
// //     }

// //     const token = header.split(" ")[1];
// //     let decoded;

// //     try {
// //       decoded = jwt.verify(token, JWT_SECRET);
// //     } catch (err) {
// //       return res.status(401).json({ message: "Invalid or expired token" });
// //     }

// //     const userId = decoded.id || decoded.emp_id || decoded.user_id;
// //     if (!userId) {
// //       return res.status(400).json({ message: "Token missing user ID" });
// //     }

// //     /** 🔹 Try Admin first */
// //     try {
// //       const admin = await Admin.findByPk(userId);
// //       if (admin) {
// //         req.user = {
// //           id: admin.id,
// //           role: admin.role.toString().toLowerCase(),
// //           userType: "admin"
// //         };
// //         return next();
// //       }
// //     } catch (err) {
// //       console.error("Admin lookup error:", err);
// //     }

// //     /** 🔹 Try Employee */
// //     try {
// //       const employee = await Employee.findByPk(userId);
// //       if (employee) {
// //         req.user = {
// //           id: employee.id,
// //           role: employee.role ? employee.role.toLowerCase() : ROLE_MAP[employee.role_id],
// //           userType: "employee"
// //         };
// //         return next();
// //       }
// //     } catch (err) {
// //       console.error("Employee lookup error:", err);
// //     }

// //     return res.status(404).json({ message: "User not found" });

// //   } catch (error) {
// //     console.error("Unexpected verifyDualToken error:", error);
// //     return res.status(500).json({ message: "Server error", error: error.message });
// //   }
// // };



// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();

// import Admin from "../modules/user/models/user.model.js";
// import Employee from "../modules/employee/models/employee.model.js";

// export const verifyDualToken = async (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   const token = authHeader.split(" ")[1];
//   const JWT_SECRET = process.env.JWT_SECRET;

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);

//     let user = await Admin.findByPk(decoded.id);
//     if (user) {
//       req.user = {
//         id: user.id,
//         role: user.role.toLowerCase(),
//         raw: decoded,
//         userType: "adminToken",
//       };
//       return next();
//     }

//     user = await Employee.findByPk(decoded.id);
//     if (user) {
//       req.user = {
//         id: user.id,
//         role: user.role.toLowerCase(),
//         raw: decoded,
//         userType: "employeeToken",
//       };
//       return next();
//     }

//     return res.status(401).json({ message: "Invalid user" });
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// };
