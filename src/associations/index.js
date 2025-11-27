
// EMPLOYEE MODELS
import Employee from "../modules/employee/models/employee.model.js";
import Role from "../modules/employee/models/role.model.js"; 

// PRODUCT MODELS

import Customer from "../modules/peoplesmaster/models/addcustomers.models.js";
import GiftCard from "../modules/promo/models/gift.models.js";
import Discount from "../modules/promo/models/adddiscount.models.js";
import DiscountPlan from "../modules/promo/models/adddiscountplan.models.js";
// 1️⃣ One Role can have many Employees
// PRODUCT MODELS
import ProductInfo from "../modules/productmaster/models/productInfo.model.js";
import SingleProduct from "../modules/productmaster/models/singleProduct.model.js";
import VariantProduct from "../modules/productmaster/models/variantProduct.model.js";
import ProductImage from "../modules/productmaster/models/productImage.model.js";
import CustomFields from "../modules/productmaster/models/customFields.model.js";

// MASTER MODELS
import Store from "../modules/productmaster/models/store.model.js";
import Categories from "../modules/productmaster/models/categories.model.js";
import Subcategory from "../modules/productmaster/models/subcategory.model.js";
import Brand from "../modules/productmaster/models/brand.model.js";
import Unit from "../modules/productmaster/models/unit.model.js";
import Tax from "../modules/productmaster/models/tax.models.js";
import Warehouse from "../modules/productmaster/models/warehouse.models.js";
import Barcode from "../modules/productmaster/models/barcode.model.js";
// --------------------------------------------
// EMPLOYEE ASSOCIATIONS
// --------------------------------------------

Role.hasMany(Employee, {
  foreignKey: "role_id",
  as: "employees",
});

Employee.belongsTo(Role, {
  foreignKey: "role_id",
  as: "role",
});

// --------------------------------------------
// CATEGORY & SUBCATEGORY
// --------------------------------------------
Categories.hasMany(Subcategory, {
  foreignKey: "category_id",
  as: "subcategories",
});

Subcategory.belongsTo(Categories, {
  foreignKey: "category_id",
  as: "category",
});

// --------------------------------------------
// PRODUCT RELATIONSHIPS
// --------------------------------------------

// STORE <-> PRODUCT
Store.hasMany(ProductInfo, { foreignKey: "store_id" });
ProductInfo.belongsTo(Store, { foreignKey: "store_id" });

// CATEGORY <-> PRODUCT
Categories.hasMany(ProductInfo, { foreignKey: "category_id" });
ProductInfo.belongsTo(Categories, { foreignKey: "category_id" });

// SUBCATEGORY <-> PRODUCT
Subcategory.hasMany(ProductInfo, { foreignKey: "subcategory_id" });
ProductInfo.belongsTo(Subcategory, { foreignKey: "subcategory_id" });

// BRAND <-> PRODUCT
Brand.hasMany(ProductInfo, { foreignKey: "brand_id" });
ProductInfo.belongsTo(Brand, { foreignKey: "brand_id" });

// UNIT <-> PRODUCT
Unit.hasMany(ProductInfo, { foreignKey: "unit_id" });
ProductInfo.belongsTo(Unit, { foreignKey: "unit_id" });

// TAX <-> PRODUCT
// Tax.hasMany(ProductInfo, { foreignKey: "tax_id" });
// ProductInfo.belongsTo(Tax, { foreignKey: "tax_id" });

// WAREHOUSE <-> PRODUCT
Warehouse.hasMany(ProductInfo, { foreignKey: "warehouse_id" });
ProductInfo.belongsTo(Warehouse, { foreignKey: "warehouse_id" });

// // WAREHOUSE <-> Barcode
// ProductInfo.hasOne(Barcode, { foreignKey: "barcode_symbology_id" });
// Barcode.belongsTo(ProductInfo, { foreignKey: "barcode_symbology_id" });

// PRODUCT <-> BARCODE (Correct Mapping)
ProductInfo.belongsTo(Barcode, {
  foreignKey: "barcode_symbology_id",
  // as: "Barcode",
});

Barcode.hasMany(ProductInfo, {
  foreignKey: "barcode_symbology_id",
  // as: "Products",
});


// PRODUCT INFO <-> SINGLE PRODUCT
ProductInfo.hasOne(SingleProduct, { foreignKey: "product_id" });
SingleProduct.belongsTo(ProductInfo, { foreignKey: "product_id" });


// SINGLE PRODUCT <-> TAX
// Tax.hasMany(SingleProduct, { foreignKey: "tax_id" });
// SingleProduct.belongsTo(Tax, { foreignKey: "tax_id" });

SingleProduct.belongsTo(Tax, { foreignKey: "tax_id", as: "tax" });
Tax.hasMany(SingleProduct, { foreignKey: "tax_id", as: "tax" });

// PRODUCT INFO <-> VARIANT PRODUCT
ProductInfo.hasMany(VariantProduct, { foreignKey: "product_id" });
VariantProduct.belongsTo(ProductInfo, { foreignKey: "product_id" });

// PRODUCT IMAGES
ProductInfo.hasMany(ProductImage, { foreignKey: "product_id" });
ProductImage.belongsTo(ProductInfo, { foreignKey: "product_id" });

// PRODUCT CUSTOM FIELDS
ProductInfo.hasOne(CustomFields, { foreignKey: "product_id" });
CustomFields.belongsTo(ProductInfo, { foreignKey: "product_id" });

// --------------------------------------------
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



export {
  Employee,
  Role,
  ProductInfo,
  SingleProduct,
  VariantProduct,
  ProductImage,
  CustomFields,
  Store,
  Categories,
  Subcategory,
  Brand,
  Unit,
  Tax,
  Warehouse,
  Barcode,
  DiscountPlan,
  Discount,
  Customer,
  GiftCard
};

