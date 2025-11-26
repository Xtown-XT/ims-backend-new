// src/modules/associations/index.js
import Employee from "../modules/employee/models/employee.model.js";
import Role from "../modules/employee/models/role.model.js"; 

import  Categories from '../modules/productmaster/models/categories.model.js'
import Customer from "../modules/peoplesmaster/models/addcustomers.models.js";
import GiftCard from "../modules/promo/models/gift.models.js";
import Discount from "../modules/promo/models/adddiscount.models.js";
import DiscountPlan from "../modules/promo/models/adddiscountplan.models.js";
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
// Categories.hasMany(Subcategory, {
//   foreignKey: "category_id",
// });

// Subcategory.belongsTo(Categories, {
//   foreignKey: "category_id",
// });






DiscountPlan.hasMany(Discount, {
  foreignKey: "discount_plan_id",
  as: "discounts",
});

// Child → Parent
Discount.belongsTo(DiscountPlan, {
  foreignKey: "discount_plan_id",
  as: "plan",
});



// promo

  Customer.hasMany(GiftCard, { foreignKey: "customer_id", as: "giftcards" });
  GiftCard.belongsTo(Customer, { foreignKey: "customer_id", as: "customer" });