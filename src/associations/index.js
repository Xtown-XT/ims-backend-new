// src/modules/associations/index.js
import Employee from "../modules/employee/models/employee.model.js";
import Role from "../modules/employee/models/role.model.js"; 
import  Subcategory from '../modules/productmaster/models/subcategory.model.js';
import  Categories from '../modules/productmaster/models/categories.model.js'
// 1️⃣ One Role can have many Employees
Role.hasMany(Employee, {
  foreignKey: "role_id",
  as: "employees",
});

// 2️⃣ Each Employee belongs to one Role
Employee.belongsTo(Role, {
  foreignKey: "role_id",
  as: "role",
});


// -------------- ASSOCIATION --------------
Categories.hasMany(Subcategory, {
  foreignKey: "category_id",
});

Subcategory.belongsTo(Categories, {
  foreignKey: "category_id",
});