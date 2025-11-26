// import { Op } from "sequelize";
// import ProductInfo from "../modules/productmaster/models/productInfo.model.js";
// import  Category  from "../modules/productmaster/models/categories.model.js";
// import  Store  from "../modules/productmaster/models/store.model.js";

// /**
//  * generateSKU({ storeId, categoryId })
//  *
//  * Example output: FM-PH-000123
//  */
// export const generateSKU = async ({ storeId, categoryId }) => {
//   // fetch codes
//   const store = await Store.findByPk(storeId);
//   const category = await Category.findByPk(categoryId);

//   if (!store || !category) throw new Error("Invalid storeId or categoryId");

//   const prefix = `${store.code}-${category.code}`.toUpperCase(); // e.g. FM-PH

//   // find last SKU with this prefix
//   const last = await ProductInfo.findOne({
//     where: { sku: { [Op.like]: `${prefix}-%` } },
//     order: [["createdAt", "DESC"]]
//   });

//   let nextNumber = 1;
//   if (last?.sku) {
//     // last.sku = "FM-PH-000123"
//     const parts = last.sku.split("-");
//     const numericPart = parts[parts.length - 1];
//     const parsed = parseInt(numericPart, 10);
//     if (!isNaN(parsed)) nextNumber = parsed + 1;
//   }

//   const padded = String(nextNumber).padStart(6, "0");
//   const sku = `${prefix}-${padded}`;
//   return sku;
// };


// src/utils/skuGenerator.js
import { Op } from "sequelize";
import ProductInfo from "../modules/productmaster/models/productInfo.model.js";
import  Category  from "../modules/productmaster/models/categories.model.js";
import  Store  from "../modules/productmaster/models/store.model.js";

export const generateSKU = async ({ storeId, categoryId }) => {
  const store = await Store.findByPk(storeId);
  const category = await Category.findByPk(categoryId);

  if (!store || !category) {
    throw new Error("Store or Category not found");
  }

  const prefix = `${store.store_code}-${category.category_code}`.toUpperCase();

  const lastSku = await ProductInfo.findOne({
    where: { sku: { [Op.like]: `${prefix}-%` } },
    order: [["createdAt", "DESC"]],
  });

  let nextNumber = 1;

  if (lastSku?.sku) {
    const parts = lastSku.sku.split("-");
    const num = parseInt(parts[parts.length - 1], 10);
    if (!isNaN(num)) nextNumber = num + 1;
  }

  const padded = String(nextNumber).padStart(6, "0");
  return `${prefix}-${padded}`;
};
