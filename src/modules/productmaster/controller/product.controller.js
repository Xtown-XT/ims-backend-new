import ProductInfo from "../models/productInfo.model.js";
import SingleProduct from "../models/singleProduct.model.js";
import VariantProduct from "../models/variantProduct.model.js";
import ProductImage from "../models/productImage.model.js";
import CustomFields from "../models/customFields.model.js";
import  Variants from "../models/variant.models.js";
import { Store, Categories, Subcategory, Brand, Unit, Tax, Warehouse, Barcode } from "../../../associations/index.js";

import { sequelize } from "../../../db/index.js";
import { generateSKU } from "../../../utils/skuGenerator.js";
import { generateSlug } from "../../../utils/slugGenerator.js";
import { formatDates } from "../../../utils/dataFormatter.js";
import moment from "moment";
import { Op, Sequelize } from "sequelize";

const productController = {
  // ===================== GENERATE SKU API ======================
  async generateSKUController(req, res) {
    try {
      const { storeId, categoryId } = req.query;

      if (!storeId || !categoryId) {
        return res.status(400).json({ message: "storeId and categoryId are required" });
      }

      const sku = await generateSKU({ storeId, categoryId });
      return res.status(200).json({ sku });

    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

// ===================== CREATE FULL PRODUCT ======================

// async createFullProduct(req, res) {
//   const t = await sequelize.transaction();
//   try {
//     const userId = req.user?.id;

//     const productInfo = req.body.productInfo ? JSON.parse(req.body.productInfo) : {};
//     const singleProduct = req.body.singleProduct ? JSON.parse(req.body.singleProduct) : null;
//     const variantProducts = req.body.variantProducts ? JSON.parse(req.body.variantProducts) : null;
//     const customFields = req.body.customFields ? JSON.parse(req.body.customFields) : null;

//     // ===================== VALIDATION ======================
//     if (singleProduct && variantProducts) {
//       return res.status(400).json({ message: "Provide either singleProduct OR variantProducts, not both." });
//     }
//     if (!singleProduct && !variantProducts) {
//       return res.status(400).json({ message: "Either singleProduct or variantProducts is required." });
//     }

//     // if (!productInfo.sku) {
//     //   productInfo.sku = await generateSKU({
//     //     storeId: productInfo.store_id,
//     //     categoryId: productInfo.category_id
//     //   });
//     // }

//     if (!productInfo.slug && productInfo.product_name) {
//       productInfo.slug = generateSlug(productInfo.product_name);
//     }

//     productInfo.created_by = userId;
//     productInfo.updated_by = userId;

//     const product = await ProductInfo.create(productInfo, { transaction: t });

//     if (singleProduct) {
//       await SingleProduct.create(
//         { ...singleProduct, product_id: product.id, created_by: userId, updated_by: userId },
//         { transaction: t }
//       );
//     }

//     // ===================== VARIANT PRODUCTS ======================
//     if (Array.isArray(variantProducts) && variantProducts.length > 0) {
//       for (const v of variantProducts) {

//         // 1️⃣ Get variant row (size/color/etc)
//         const variantRow = await Variants.findOne({
//           where: { variant_name: v.attribute_name },
//           transaction: t
//         });

//         if (!variantRow) {
//           await t.rollback();
//           return res.status(400).json({
//             message: `Variant type '${v.attribute_name}' does not exist`
//           });
//         }

//         // ===================== SAFE FORMAT CHECK =====================
//         let allowedValues = [];
//         const dbValue = variantRow.variant_value;

//         if (typeof dbValue === "string") {
//           allowedValues = dbValue.split(",").map(val => val.trim().toLowerCase());
//         } else if (Array.isArray(dbValue)) {
//           allowedValues = dbValue.map(val => val.trim().toLowerCase());
//         } else if (dbValue === null) {
//           await t.rollback();
//           return res.status(400).json({
//             message: `No values configured for variant '${v.attribute_name}'`
//           });
//         } else {
//           await t.rollback();
//           return res.status(400).json({
//             message: "Invalid variant_value format in database"
//           });
//         }

//         // 2️⃣ Clean incoming attribute_value
//         const incomingValue = v.attribute_value.trim().toLowerCase();

//         // 3️⃣ Match value
//         if (!allowedValues.includes(incomingValue)) {
//           await t.rollback();
//           return res.status(400).json({
//             message: `Invalid value '${v.attribute_value}' for '${v.attribute_name}'. Allowed: ${allowedValues.join(", ")}`
//           });
//         }

//         // 4️⃣ Generate Variant SKU
//         // const variantSku = `${product.sku}-V${Math.floor(Math.random() * 9000) + 1000}`;

//         // 5️⃣ Create variant product
//         await VariantProduct.create(
//           {
//             product_id: product.id,

//             attribute_name: v.attribute_name,
//             attribute_value: incomingValue,

//             // sku: variantSku,
//             sku: v.sku,
//             barcode_symbology_id: v.barcode_symbology_id,

//             quantity: v.quantity ?? 0,
//             quantity_alert: v.quantity_alert ?? 0,

//             price: v.price ?? 0,

//             tax_id: v.tax_id,
//             tax_type: v.tax_type,

//             discount_type: v.discount_type,
//             discount_value: v.discount_value,

//             created_by: userId,
//             updated_by: userId
//           },
//           { transaction: t }
//         );
//       }
//     }

//     // ===================== single PRODUCT IMAGES ======================
    

//     if (req.files?.length > 0) {
//   for (const file of req.files) {
//     await ProductImage.create(
//       {
//        product_id: product.id,          // main product always required
//         variant_product_id: req.body.variant_product_id || null, 
//         image_url: file.filename,
//         created_by: userId,
//         updated_by: userId,
//         is_active: true
//       },
//       { transaction: t }
//     );
//   }
// }


//     // ===================== CUSTOM FIELDS ======================
//     if (customFields) {
//       await CustomFields.create(
//         { ...customFields, product_id: product.id, created_by: userId, updated_by: userId },
//         { transaction: t }
//       );
//     }

//     await t.commit();
//     return res.status(201).json({ message: "Product created successfully" });

//   } catch (error) {
//     await t.rollback();
//     return res.status(500).json({ message: error.message });
//   }
// }
// ,

async createFullProduct(req, res) {
  const t = await sequelize.transaction();

  try {
    const userId = req.user?.id;

    const productInfo = req.body.productInfo ? JSON.parse(req.body.productInfo) : {};
    const singleProduct = req.body.singleProduct ? JSON.parse(req.body.singleProduct) : null;
    const variantProducts = req.body.variantProducts ? JSON.parse(req.body.variantProducts) : null;
    const customFields = req.body.customFields ? JSON.parse(req.body.customFields) : null;

    // ===================== BASIC VALIDATION ======================
    if (singleProduct && variantProducts)
      return res.status(400).json({ message: "Provide either singleProduct OR variantProducts, not both." });

    if (!singleProduct && !variantProducts)
      return res.status(400).json({ message: "Either singleProduct or variantProducts is required." });

    // Auto slug if missing
    // if (!productInfo.slug && productInfo.product_name) {
    //   productInfo.slug = generateSlug(productInfo.product_name);
    // }
// Auto slug if missing
if (!productInfo.slug && productInfo.product_name) {
  productInfo.slug = await generateSlug(productInfo.product_name);  // IMPORTANT FIX
}

    productInfo.created_by = userId;
    productInfo.updated_by = userId;

    // ===================== CREATE MAIN PRODUCT ======================
    const product = await ProductInfo.create(productInfo, { transaction: t });

    // ===================== SINGLE PRODUCT ======================
    if (singleProduct) {
      await SingleProduct.create(
        {
          ...singleProduct,
          product_id: product.id,
          created_by: userId,
          updated_by: userId,
        },
        { transaction: t }
      );
    }

    // ===================== VARIANT PRODUCTS CREATION ======================
    const createdVariantProducts = []; // IMPORTANT: stored to assign images later

    if (Array.isArray(variantProducts) && variantProducts.length > 0) {
      for (const v of variantProducts) {
        const variantRow = await Variants.findOne({
          where: { variant_name: v.attribute_name },
          transaction: t,
        });

        if (!variantRow) {
          await t.rollback();
          return res.status(400).json({
            message: `Variant type '${v.attribute_name}' does not exist`,
          });
        }

        // Safe parse variant_value
        let allowedValues = [];
        const dbValue = variantRow.variant_value;

        if (typeof dbValue === "string") {
          allowedValues = dbValue.split(",").map(val => val.trim().toLowerCase());
        } else if (Array.isArray(dbValue)) {
          allowedValues = dbValue.map(val => val.trim().toLowerCase());
        } else {
          await t.rollback();
          return res.status(400).json({
            message: `Invalid variant_value format for '${v.attribute_name}'`,
          });
        }

        const incomingValue = v.attribute_value.trim().toLowerCase();

        if (!allowedValues.includes(incomingValue)) {
          await t.rollback();
          return res.status(400).json({
            message: `Invalid value '${v.attribute_value}' for '${v.attribute_name}'. Allowed: ${allowedValues.join(", ")}`,
          });
        }

        // Create Variant Product
        const createdV = await VariantProduct.create(
          {
            product_id: product.id,
            attribute_name: v.attribute_name,
            attribute_value: incomingValue,
            sku: v.sku, // coming from another API
            barcode_symbology_id: v.barcode_symbology_id,
            quantity: v.quantity ?? 0,
            quantity_alert: v.quantity_alert ?? 0,
            price: v.price ?? 0,
            tax_id: v.tax_id,
            tax_type: v.tax_type,
            discount_type: v.discount_type,
            discount_value: v.discount_value,
            created_by: userId,
            updated_by: userId,
          },
          { transaction: t }
        );

        createdVariantProducts.push({
          attribute_name: v.attribute_name,
          attribute_value: incomingValue,
          id: createdV.id,
        });
      }
    }

    // ===================== IMAGE UPLOAD HANDLING ======================
    if (req.files?.length > 0) {
      for (const file of req.files) {
        let targetVariantId = null;

        // If frontend sends attribute info -> map it
        if (req.body.imageMapping) {
          const map = JSON.parse(req.body.imageMapping);

          const match = createdVariantProducts.find(
            x =>
              x.attribute_name === map.attribute_name &&
              x.attribute_value === map.attribute_value
          );

          if (match) targetVariantId = match.id;
        }

        await ProductImage.create(
          {
            product_id: product.id,
            variant_product_id: targetVariantId, // NULL for single product
            image_url: file.filename,
            created_by: userId,
            updated_by: userId,
            is_active: true,
          },
          { transaction: t }
        );
      }
    }

    // ===================== CUSTOM FIELDS ======================
    if (customFields) {
      await CustomFields.create(
        {
          ...customFields,
          product_id: product.id,
          created_by: userId,
          updated_by: userId,
        },
        { transaction: t }
      );
    }

    await t.commit();
    return res.status(201).json({ message: "Product created successfully" });

  } catch (error) {
    await t.rollback();
    return res.status(500).json({ message: error.message });
  }
}
,
// ===================== GET ALL PRODUCTS ======================

async getAllProducts(req, res) {
  try {
    const {
      search = "",
      page = 1,
      limit = 10,
      orderBy = "createdAt",
      order = "DESC",
    } = req.query;

    const offset = (page - 1) * limit;

    // 🔍 SEARCH CONDITION
    const whereClause = search
      ? {
          product_name: {
            [sequelize.Op.like]: `%${search}%`,
          },
        }
      : {};

    const { rows, count } = await ProductInfo.findAndCountAll({
      where: whereClause,
      include: [
        { model: Store, attributes: ["id", "store_name"] },
        { model: Warehouse, attributes: ["id", "warehouse_name"] },
        { model: Categories, attributes: ["id", "category_name"] },
        { model: Subcategory, attributes: ["id", "subcategory_name"] },
        { model: Brand, attributes: ["id", "brand_name"] },
        { model: Unit, attributes: ["id", "unit_name"] },

        // ✅ BARCODE (with alias if you used it)
        {
          model: Barcode,
          as: "Barcode",
          attributes: ["id", "text",  "image_url"],
        },

        // SINGLE PRODUCT + TAX
        {
          model: SingleProduct,
          include: [
            {
              model: Tax,
              as: "tax",
              attributes: ["id", "tax_name", "tax_percentage", "tax_type", "description"],
            },
          ],
        },

        { model: VariantProduct },
        { model: ProductImage },
        { model: CustomFields },
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[orderBy, order]],
    });

    // 🌐 BASE URL
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    // FORMAT RESPONSE ✔
    const formatted = rows.map((p) => {
      const json = p.toJSON();

      // ✔ BARCODE IMAGE URL
      json.Barcode = json.Barcode
        ? {
            ...json.Barcode,
            image_url: json.Barcode.image_url
              ? `${baseUrl}/uploads/barcodes/${json.Barcode.image_url}`
              : null,
          }
        : null;

      // ✔ MULTIPLE PRODUCT IMAGES
      json.ProductImages = json.ProductImages?.map((img) => ({
        ...img,
        image_url: img.image_url
          ? `${baseUrl}/uploads/products/${img.image_url}`
          : null,
      }));

      return json;
    });

    return res.status(200).json({
      message: "Products fetched successfully",
      data: formatted,
      total: count,
      page: parseInt(page),
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    return res.status(500).json({
      message: "Failed to fetch products",
      error: error.message,
    });
  }
},

async getProductById(req, res) {
  try {
    const { id } = req.params;

    const product = await ProductInfo.findOne({
      where: { id },
      include: [
        { model: Store, attributes: ["id", "store_name"] },
        { model: Warehouse, attributes: ["id", "warehouse_name"] },
        { model: Categories, attributes: ["id", "category_name"] },
        { model: Subcategory, attributes: ["id", "subcategory_name"] },
        { model: Brand, attributes: ["id", "brand_name"] },
        { model: Unit, attributes: ["id", "unit_name"] },

        // BARCODE (same alias as getAllProducts)
        {
          model: Barcode,
          as: "Barcode",
          attributes: ["id", "text", "type", "image_url"],
        },

        // Single product + tax
        {
          model: SingleProduct,
          include: [
            {
              model: Tax,
              as: "tax",
              attributes: [
                "id",
                "tax_name",
                "tax_percentage",
                "tax_type",
                "description",
              ],
            },
          ],
        },

        { model: VariantProduct },
        { model: ProductImage },
        { model: CustomFields },
      ],
    });

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const json = product.toJSON();

    // ✔ BARCODE IMAGE URL
    json.Barcode = json.Barcode
      ? {
          ...json.Barcode,
          image_url: json.Barcode.image_url
            ? `${baseUrl}/uploads/barcodes/${json.Barcode.image_url}`
            : null,
        }
      : null;

    // ✔ FORMAT MULTIPLE PRODUCT IMAGES
    json.ProductImages = json.ProductImages?.map((img) => ({
      ...img,
      image_url: img.image_url
        ? `${baseUrl}/uploads/products/${img.image_url}`
        : null,
    }));

    return res.status(200).json({
      message: "Product fetched successfully",
      data: json,
    });
  } catch (error) {
    console.error("❌ Error fetching product:", error);
    return res.status(500).json({
      message: "Failed to fetch product",
      error: error.message,
    });
  }
},

async deleteProduct(req, res) {
  const t = await sequelize.transaction();
  try {
    const { id } = req.params;

    // Check if product exists
    const product = await ProductInfo.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete related models first
    await ProductImage.destroy({ where: { product_id: id }, transaction: t });
    await SingleProduct.destroy({ where: { product_id: id }, transaction: t });
    await VariantProduct.destroy({ where: { product_id: id }, transaction: t });
    await CustomFields.destroy({ where: { product_id: id }, transaction: t });

    // Finally delete main product
    await ProductInfo.destroy({ where: { id }, transaction: t });

    await t.commit();
    return res.status(200).json({ message: "Product deleted successfully" });

  } catch (error) {
    await t.rollback();
    return res.status(500).json({ message: error.message });
  }
},


// async updateProduct(req, res) {
//   const t = await sequelize.transaction();

//   try {
//     const { id } = req.params;
//     const userId = req.user?.id;

//     // 🛑 SAFE PARSE FUNCTION — prevents crash
//     const safeParse = (val) => {
//       try {
//         return val ? JSON.parse(val) : null;
//       } catch (e) {
//         return null;
//       }
//     };

//     const productInfo = safeParse(req.body.productInfo);
//     const singleProduct = safeParse(req.body.singleProduct);
//     const variantProducts = safeParse(req.body.variantProducts);
//     const customFields = safeParse(req.body.customFields);

//     // 🔍 Check if product exists
//     const product = await ProductInfo.findByPk(id);
//     if (!product)
//       return res.status(404).json({ message: "Product not found" });

//     // ------------------------------------
//     // 🔵 UPDATE MAIN PRODUCT
//     // ------------------------------------
//     if (productInfo) {
//       productInfo.updated_by = userId;
//       await ProductInfo.update(productInfo, {
//         where: { id },
//         transaction: t,
//       });
//     }

//     // ------------------------------------
//     // 🔵 UPDATE SINGLE PRODUCT
//     // ------------------------------------
//     if (singleProduct) {
//       await SingleProduct.update(
//         { ...singleProduct, updated_by: userId },
//         { where: { product_id: id }, transaction: t }
//       );
//     }

//     // ------------------------------------
//     // 🔵 UPDATE VARIANTS
//     // ------------------------------------
  
//    if (Array.isArray(variantProducts) && variantProducts.length > 0) {

//   // delete old variants completely
//   await VariantProduct.destroy({
//     where: { product_id: id },
//     transaction: t,
//   });

//   // recreate variants
//   for (const v of variantProducts) {

//     const variantSku = `${product.sku}-V${Math.floor(Math.random() * 9000) + 1000}`;

//     await VariantProduct.create(
//       {
//         product_id: id,

//         attribute_name: v.attribute_name,
//         attribute_value: v.attribute_value,

//         sku: variantSku,
//         barcode_symbology_id: v.barcode_symbology_id,

//         quantity: v.quantity ?? 0,
//         quantity_alert: v.quantity_alert ?? 0,

//         price: v.price ?? 0,

//         tax_id: v.tax_id,
//         tax_type: v.tax_type,

//         discount_type: v.discount_type,
//         discount_value: v.discount_value,

//         created_by: userId,
//         updated_by: userId,
//       },
//       { transaction: t }
//     );
//   }
// }


//     // ------------------------------------
//     // 🔵 UPDATE IMAGES
//     // ------------------------------------
//     if (req.files?.length > 0) {
//       await ProductImage.destroy({
//         where: { product_id: id },
//         transaction: t,
//       });

//       for (const file of req.files) {
//         await ProductImage.create(
//           {
//             product_id: id,
//             image_url: file.filename,
//             created_by: userId,
//           },
//           { transaction: t }
//         );
//       }
//     }

//     // ------------------------------------
//     // 🔵 UPDATE CUSTOM FIELDS
//     // ------------------------------------
//     if (customFields) {
//       await CustomFields.update(
//         { ...customFields, updated_by: userId },
//         { where: { product_id: id }, transaction: t }
//       );
//     }

//     await t.commit();
//     return res
//       .status(200)
//       .json({ message: "Product updated successfully" });
//   } catch (error) {
//     await t.rollback();
//     return res.status(500).json({ message: error.message });
//   }
// },

// ===================== UPDATE VARIANT PRODUCT IMAGES ======================


async updateProduct(req, res) {
  const t = await sequelize.transaction();

  try {
    const { id } = req.params;
    const userId = req.user?.id;

    // ========= SAFE PARSER ============
    const safeParse = (v) => {
      try {
        return v ? JSON.parse(v) : null;
      } catch {
        return null;
      }
    };

    const productInfo = safeParse(req.body.productInfo);
    const singleProduct = safeParse(req.body.singleProduct);
    const variantProducts = safeParse(req.body.variantProducts);
    const customFields = safeParse(req.body.customFields);
    const imageMapping = safeParse(req.body.imageMapping);

    // ========= CHECK PRODUCT EXISTS ============
    const product = await ProductInfo.findByPk(id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    // ========= VALIDATION ============
    if (singleProduct && variantProducts)
      return res.status(400).json({
        message: "Provide either singleProduct OR variantProducts, not both.",
      });

    if (!singleProduct && !variantProducts)
      return res.status(400).json({
        message: "Either singleProduct or variantProducts is required.",
      });

    // ========= UPDATE MAIN PRODUCT ============
    if (productInfo) {
      // auto-slug
      if (!productInfo.slug && productInfo.product_name) {
        productInfo.slug = generateSlug(productInfo.product_name);
      }

      productInfo.updated_by = userId;

      await ProductInfo.update(productInfo, {
        where: { id },
        transaction: t,
      });
    }

    // ========= UPDATE SINGLE PRODUCT ============
    if (singleProduct) {
      await SingleProduct.update(
        { ...singleProduct, updated_by: userId },
        { where: { product_id: id }, transaction: t }
      );
    }

    // ========= UPDATE VARIANT PRODUCTS ============
    const createdVariantProducts = [];

    if (Array.isArray(variantProducts)) {
      // delete old variants completely
      await VariantProduct.destroy({
        where: { product_id: id },
        transaction: t,
      });

      // recreate variants
      for (const v of variantProducts) {
        // ===== validate variant type exists =====
        const variantRow = await Variants.findOne({
          where: { variant_name: v.attribute_name },
          transaction: t,
        });

        if (!variantRow) {
          await t.rollback();
          return res.status(400).json({
            message: `Variant type '${v.attribute_name}' does not exist`,
          });
        }

        // ===== validate allowed variant values =====
        let allowedValues = [];
        const dbValue = variantRow.variant_value;

        if (typeof dbValue === "string") {
          allowedValues = dbValue.split(",").map((x) => x.trim().toLowerCase());
        } else if (Array.isArray(dbValue)) {
          allowedValues = dbValue.map((x) => x.trim().toLowerCase());
        } else {
          await t.rollback();
          return res.status(400).json({
            message: `Invalid variant_value format for '${v.attribute_name}'`,
          });
        }

        const incomingValue = v.attribute_value.toLowerCase().trim();

        if (!allowedValues.includes(incomingValue)) {
          await t.rollback();
          return res.status(400).json({
            message: `Invalid value '${v.attribute_value}' for '${v.attribute_name}'. Allowed: ${allowedValues.join(", ")}`,
          });
        }

        // ===== CREATE NEW VARIANT PRODUCT =====
        const createdV = await VariantProduct.create(
          {
            product_id: id,
            attribute_name: v.attribute_name,
            attribute_value: incomingValue,
            sku: v.sku, // always coming from external API
            barcode_symbology_id: v.barcode_symbology_id,
            quantity: v.quantity ?? 0,
            quantity_alert: v.quantity_alert ?? 0,
            price: v.price ?? 0,
            tax_id: v.tax_id,
            tax_type: v.tax_type,
            discount_type: v.discount_type,
            discount_value: v.discount_value,
            created_by: userId,
            updated_by: userId,
          },
          { transaction: t }
        );

        createdVariantProducts.push({
          attribute_name: v.attribute_name,
          attribute_value: incomingValue,
          id: createdV.id,
        });
      }
    }

    // ========= UPDATE IMAGES ============
    if (req.files?.length > 0) {
      // delete old images
      await ProductImage.destroy({
        where: { product_id: id },
        transaction: t,
      });

      // recreate images
      for (const file of req.files) {
        let targetVariantId = null;

        if (imageMapping) {
          const match = createdVariantProducts.find(
            (x) =>
              x.attribute_name === imageMapping.attribute_name &&
              x.attribute_value === imageMapping.attribute_value
          );

          if (match) targetVariantId = match.id;
        }

        await ProductImage.create(
          {
            product_id: id,
            variant_product_id: targetVariantId,
            image_url: file.filename,
            created_by: userId,
            updated_by: userId,
            is_active: true,
          },
          { transaction: t }
        );
      }
    }

    // ========= UPDATE CUSTOM FIELDS ============
    if (customFields) {
      await CustomFields.update(
        { ...customFields, updated_by: userId },
        { where: { product_id: id }, transaction: t }
      );
    }

    await t.commit();
    return res.status(200).json({ message: "Product updated successfully" });

  } catch (error) {
    await t.rollback();
    return res.status(500).json({ message: error.message });
  }
}
,
async updateVariantProductImages(req, res){
  try {
    const { product_id, variant_product_id } = req.params;

    // Validate variant product
    const variant = await VariantProduct.findOne({
      where: { id: variant_product_id, product_id },
    });

    if (!variant) {
      return res.status(404).json({
        message: "Variant Product not found for this product",
      });
    }

    // Validate files
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Upload at least one image" });
    }

    // Prepare array for bulk insert
    const imagesToInsert = req.files.map((file) => ({
      product_id,
      varient_product_id: variant_product_id,
      image_url: file.filename, // or file.path
      is_active: 1,
      created_by: req.employee?.id || null,
      updated_by: req.employee?.id || null,
    }));

    // Insert into productImage table
    await ProductImage.bulkCreate(imagesToInsert);

    res.status(200).json({
      message: "Variant product images updated successfully",
      images_added: imagesToInsert.length,
      data: imagesToInsert,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
},


async  getAllExpProducts(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { rows, count } = await ProductInfo.findAndCountAll({
      include: [
        {
          model: Store,
          as: "stores",
          attributes: ["store_name", "store_code"],
        },
        {
          model: Warehouse,
          as: "warehouses",
          attributes: ["warehouse_name"],
        },
        {
          model: CustomFields,
          as: "custom_fields",
          attributes: ["manufactured_date", "expiry_on"],
        },
        {
          model: VariantProduct,
          as: "VariantProducts",
          attributes: ["sku"], // <-- IMPORTANT
        },
      ],
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    // const formatted = rows.map((p) => ({
    //   id: p.id,
    //   product_name: p.product_name,

    //   // SKU Logic → Variant first, else ProductInfo
    //   sku: p.variant_products?.sku || p.sku,

    //   store_id: p.store_id,
    //   warehouse_id: p.warehouse_id,

    //   manufactured_date: p.custom_fields?.manufactured_date
    //     ? moment(p.custom_fields.manufactured_date).format("DD MMM YYYY")
    //     : "",

    //   expired_date: p.custom_fields?.expiry_on
    //     ? moment(p.custom_fields.expiry_on).format("DD MMM YYYY")
    //     : "",

    //   store: {
    //     store_name: p.stores?.store_name || "",
    //     store_code: p.stores?.store_code || "",
    //   },

    //   warehouse: {
    //     warehouse_name: p.warehouses?.warehouse_name || "",
    //   },
    // }));

    const formatted = rows.map((p) => {
  // Variant SKU logic (take first variant if exists)
  const variantSku =
    Array.isArray(p.VariantProducts) && p.VariantProducts.length > 0
      ? p.VariantProducts[0].sku
      : null;

  return {
    id: p.id,
    product_name: p.product_name,

    // USE VARIANT SKU IF EXISTS, ELSE FALLBACK TO PRODUCT SKU
    sku: variantSku || p.sku,

    store_id: p.store_id,
    warehouse_id: p.warehouse_id,

    manufactured_date: p.custom_fields?.manufactured_date
      ? moment(p.custom_fields.manufactured_date).format("DD MMM YYYY")
      : "",

    expired_date: p.custom_fields?.expiry_on
      ? moment(p.custom_fields.expiry_on).format("DD MMM YYYY")
      : "",

    store: {
      store_name: p.stores?.store_name || "",
      store_code: p.stores?.store_code || "",
    },

    warehouse: {
      warehouse_name: p.warehouses?.warehouse_name || "",
    },
  };
});

    return res.status(200).json({
      success: true,
      total: count,
      current_page: page,
      total_pages: Math.ceil(count / limit),
      data: formatted,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
},

async getLowStockProducts(req, res) {
  try {

     // ================================
    // 📌 Pagination & Search Inputs
    // ================================
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const search = req.query.search || "";
    const orderBy = req.query.orderBy || "product_name";
    const order = (req.query.order || "ASC").toUpperCase();

    // Enable search conditions
    const searchFilter = search
      ? {
          [Op.or]: [
            { product_name: { [Op.like]: `%${search}%` } },
            { sku: { [Op.like]: `%${search}%` } },
            { attribute_name: { [Op.like]: `%${search}%` } },
            { attribute_value: { [Op.like]: `%${search}%` } },
          ],
        }
      : {};

    // ============================================================
    // 🟦 SINGLE PRODUCTS LOW STOCK
    // ============================================================
    const singleProducts = await SingleProduct.findAll({
       where: searchFilter,
     include: [
        {
          model: ProductInfo,
          required: true,
          include: [
            {
              model: Store,
              as: "stores",
              required: false,
              where: { status: "active" },
              attributes: ["id", "store_name", "store_code"]
            },
            {
              model: Warehouse,
              as: "warehouses",
              required: false,
              where: { status: "active" },
              attributes: ["id", "warehouse_name"]
            },
            {
              model: Categories,
              required: false,
              where: { is_active: true },
              attributes: ["id", "category_name", "category_code"]
            },
            {
              model: Subcategory,
              required: false,
              where: { is_active: true },
              attributes: ["id", "subcategory_name"]
            },
            {
              model: Brand,
              required: false,
              where: { is_active: true },
              attributes: ["id", "brand_name"]
            },
            {
              model: Unit,
              required: false,
              where: { is_active: true },
              attributes: ["id", "unit_name"]
            }
          ]
        }
      ]
    });

    const singleMapped = singleProducts.map((sp) => ({
      type: "single",
      product_id: sp.product_id,
      product_name: sp.ProductInfo?.product_name,
      sku: sp.ProductInfo?.sku,
      store: sp.ProductInfo?.stores?.store_name || null,
      store_code: sp.ProductInfo?.stores?.store_code || null,
      warehouse: sp.ProductInfo?.warehouses?.warehouse_name || null,
      category: sp.ProductInfo?.Category?.category_name || null,
      subcategory: sp.ProductInfo?.Subcategory?.subcategory_name || null,
      brand: sp.ProductInfo?.Brand?.brand_name || null,
      unit: sp.ProductInfo?.Unit?.unit_name || null,
      quantity: sp.quantity,
      quantity_alert: sp.quantity_alert
    }));

    // ============================================================
    // 🟥 VARIANT PRODUCTS LOW STOCK
    // ============================================================
    const variantProducts = await VariantProduct.findAll({
       where: searchFilter,
     include: [
        {
          model: ProductInfo,
          required: true,
          include: [
            {
              model: Store,
              as: "stores",
              required: false,
              where: { status: "active" },
              attributes: ["id", "store_name", "store_code"]
            },
            {
              model: Warehouse,
              as: "warehouses",
              required: false,
              where: { status: "active" },
              attributes: ["id", "warehouse_name"]
            },
            {
              model: Categories,
              required: false,
              where: { is_active: true },
              attributes: ["id", "category_name", "category_code"]
            },
            {
              model: Subcategory,
              required: false,
              where: { is_active: true },
              attributes: ["id", "subcategory_name"]
            },
            {
              model: Brand,
              required: false,
              where: { is_active: true },
              attributes: ["id", "brand_name"]
            },
            {
              model: Unit,
              required: false,
              where: { is_active: true },
              attributes: ["id", "unit_name"]
            }
          ]
        }
      ]
    });

    const variantMapped = variantProducts.map((vp) => ({
      type: "variant",
      product_id: vp.product_id,
      product_name: vp.ProductInfo?.product_name,

      // SKU fallback logic — EXACT match to SQL CASE
      sku:
        vp.ProductInfo?.sku && vp.ProductInfo?.sku !== ""
          ? vp.ProductInfo.sku
          : vp.sku,

      store: vp.ProductInfo?.stores?.store_name || null,
      store_code: vp.ProductInfo?.stores?.store_code || null,
      warehouse: vp.ProductInfo?.warehouses?.warehouse_name || null,
      category: vp.ProductInfo?.Category?.category_name || null,
      subcategory: vp.ProductInfo?.Subcategory?.subcategory_name || null,
      brand: vp.ProductInfo?.Brand?.brand_name || null,
      unit: vp.ProductInfo?.Unit?.unit_name || null,
      attribute_name: vp.attribute_name,
      attribute_value: vp.attribute_value,
      quantity: vp.quantity,
      quantity_alert: vp.quantity_alert
    }));

    // // ============================================================
    // // 🟩 MERGE BOTH RESULTS
    // // ============================================================
    // const finalResponse = [...singleMapped, ...variantMapped];

    // return res.status(200).json({
    //   message: "Low stock products fetched successfully",
    //   count: finalResponse.length,
    //   data: finalResponse
    // });

    let finalList = [...singleMapped, ...variantMapped];

    // Sorting
    finalList = finalList.sort((a, b) => {
      const A = a[orderBy] ? a[orderBy].toString().toLowerCase() : "";
      const B = b[orderBy] ? b[orderBy].toString().toLowerCase() : "";
      return order === "ASC" ? A.localeCompare(B) : B.localeCompare(A);
    });

    const paginated = finalList.slice(offset, offset + limit);

    return res.status(200).json({
      message: "Low stock products fetched successfully",
      page,
      limit,
      total: finalList.length,
      totalPages: Math.ceil(finalList.length / limit),
      data: paginated,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

};


export default productController;
