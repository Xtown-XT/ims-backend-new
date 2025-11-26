// src/modules/productmaster/controller/product.controller.js

import ProductInfo from "../models/productInfo.model.js";
import SingleProduct from "../models/singleProduct.model.js";
import VariantProduct from "../models/variantProduct.model.js";
import ProductImage from "../models/productImage.model.js";
import CustomFields from "../models/customFields.model.js";

import { Store, Categories, Subcategory, Brand, Unit, Tax, Warehouse, Barcode } from "../../../associations/index.js";

import { sequelize } from "../../../db/index.js";
import { generateSKU } from "../../../utils/skuGenerator.js";
import { generateSlug } from "../../../utils/slugGenerator.js";

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

  // // ===================== CREATE FULL PRODUCT ======================
  async createFullProduct(req, res) {
  const t = await sequelize.transaction();
  try {

    // extract user id from token
    const userId = req.user?.id;    

    const productInfo = req.body.productInfo ? JSON.parse(req.body.productInfo) : {};
    const singleProduct = req.body.singleProduct ? JSON.parse(req.body.singleProduct) : null;
    const variantProducts = req.body.variantProducts ? JSON.parse(req.body.variantProducts) : null;
    const customFields = req.body.customFields ? JSON.parse(req.body.customFields) : null;

    if (singleProduct && variantProducts) {
      return res.status(400).json({ message: "Provide either singleProduct OR variantProducts, not both." });
    }
    if (!singleProduct && !variantProducts) {
      return res.status(400).json({ message: "Either singleProduct or variantProducts is required." });
    }

    if (!productInfo.sku) {
      productInfo.sku = await generateSKU({
        storeId: productInfo.store_id,
        categoryId: productInfo.category_id
      });
    }

    if (!productInfo.slug && productInfo.product_name) {
      productInfo.slug = generateSlug(productInfo.product_name);
    }

    // ---------- Add Created By & Updated By ----------
    productInfo.created_by = userId;
    productInfo.updated_by = userId;

    const product = await ProductInfo.create(productInfo, { transaction: t });

    if (singleProduct) {
      await SingleProduct.create(
        { ...singleProduct, product_id: product.id, created_by: userId, updated_by: userId },
        { transaction: t }
      );
    }

    if (variantProducts?.length > 0) {
      for (const v of variantProducts) {
        const variantSku = `${product.sku}-V${Math.floor(Math.random() * 9000) + 1000}`;
        await VariantProduct.create(
          { ...v, product_id: product.id, sku: variantSku, created_by: userId, updated_by: userId },
          { transaction: t }
        );
      }
    }

    if (req.files?.length > 0) {
      for (const file of req.files) {
        await ProductImage.create(
          { product_id: product.id, image_url: file.filename, created_by: userId },
          { transaction: t }
        );
      }
    }

    if (customFields) {
      await CustomFields.create(
        { ...customFields, product_id: product.id, created_by: userId, updated_by: userId },
        { transaction: t }
      );
    }

    await t.commit();
    return res.status(201).json({ message: "Product created successfully" });

  } catch (error) {
    await t.rollback();
    return res.status(500).json({ message: error.message });
  }
},

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
          attributes: ["id", "text", "type", "image_url"],
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

//     const productInfo = req.body.productInfo ? JSON.parse(req.body.productInfo) : {};
//     const singleProduct = req.body.singleProduct ? JSON.parse(req.body.singleProduct) : null;
//     const variantProducts = req.body.variantProducts ? JSON.parse(req.body.variantProducts) : null;
//     const customFields = req.body.customFields ? JSON.parse(req.body.customFields) : null;

//     // Check if product exists
//     const product = await ProductInfo.findByPk(id);
//     if (!product) return res.status(404).json({ message: "Product not found" });

//     // ---------- UPDATE MAIN PRODUCT ----------
//     if (productInfo) {
//       productInfo.updated_by = userId;
//       await ProductInfo.update(productInfo, { where: { id }, transaction: t });
//     }

//     // ---------- UPDATE SINGLE PRODUCT ----------
//     if (singleProduct) {
//       await SingleProduct.update(
//         { ...singleProduct, updated_by: userId },
//         { where: { product_id: id }, transaction: t }
//       );
//     }

//     // ---------- UPDATE VARIANTS ----------
//     if (variantProducts?.length > 0) {
//       // Remove old variants and insert new ones
//       await VariantProduct.destroy({ where: { product_id: id }, transaction: t });

//       for (const v of variantProducts) {
//         const variantSku = `${product.sku}-V${Math.floor(Math.random() * 9000) + 1000}`;
//         await VariantProduct.create(
//           { ...v, product_id: id, sku: variantSku, created_by: userId, updated_by: userId },
//           { transaction: t }
//         );
//       }
//     }

//     // ---------- UPDATE IMAGES ----------
//     if (req.files?.length > 0) {
//       // delete previous images
//       await ProductImage.destroy({ where: { product_id: id }, transaction: t });

//       for (const file of req.files) {
//         await ProductImage.create(
//           { product_id: id, image_url: file.filename, created_by: userId },
//           { transaction: t }
//         );
//       }
//     }

//     // ---------- UPDATE CUSTOM FIELDS ----------
//     if (customFields) {
//       await CustomFields.update(
//         { ...customFields, updated_by: userId },
//         { where: { product_id: id }, transaction: t }
//       );
//     }

//     await t.commit();
//     return res.status(200).json({ message: "Product updated successfully" });

//   } catch (error) {
//     await t.rollback();
//     return res.status(500).json({ message: error.message });
//   }
// },

async updateProduct(req, res) {
  const t = await sequelize.transaction();

  try {
    const { id } = req.params;
    const userId = req.user?.id;

    // 🛑 SAFE PARSE FUNCTION — prevents crash
    const safeParse = (val) => {
      try {
        return val ? JSON.parse(val) : null;
      } catch (e) {
        return null;
      }
    };

    const productInfo = safeParse(req.body.productInfo);
    const singleProduct = safeParse(req.body.singleProduct);
    const variantProducts = safeParse(req.body.variantProducts);
    const customFields = safeParse(req.body.customFields);

    // 🔍 Check if product exists
    const product = await ProductInfo.findByPk(id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    // ------------------------------------
    // 🔵 UPDATE MAIN PRODUCT
    // ------------------------------------
    if (productInfo) {
      productInfo.updated_by = userId;
      await ProductInfo.update(productInfo, {
        where: { id },
        transaction: t,
      });
    }

    // ------------------------------------
    // 🔵 UPDATE SINGLE PRODUCT
    // ------------------------------------
    if (singleProduct) {
      await SingleProduct.update(
        { ...singleProduct, updated_by: userId },
        { where: { product_id: id }, transaction: t }
      );
    }

    // ------------------------------------
    // 🔵 UPDATE VARIANTS
    // ------------------------------------
    if (Array.isArray(variantProducts) && variantProducts.length > 0) {
      await VariantProduct.destroy({
        where: { product_id: id },
        transaction: t,
      });

      for (const v of variantProducts) {
        const variantSku = `${product.sku}-V${Math.floor(
          Math.random() * 9000
        ) + 1000}`;

        await VariantProduct.create(
          {
            ...v,
            product_id: id,
            sku: variantSku,
            created_by: userId,
            updated_by: userId,
          },
          { transaction: t }
        );
      }
    }

    // ------------------------------------
    // 🔵 UPDATE IMAGES
    // ------------------------------------
    if (req.files?.length > 0) {
      await ProductImage.destroy({
        where: { product_id: id },
        transaction: t,
      });

      for (const file of req.files) {
        await ProductImage.create(
          {
            product_id: id,
            image_url: file.filename,
            created_by: userId,
          },
          { transaction: t }
        );
      }
    }

    // ------------------------------------
    // 🔵 UPDATE CUSTOM FIELDS
    // ------------------------------------
    if (customFields) {
      await CustomFields.update(
        { ...customFields, updated_by: userId },
        { where: { product_id: id }, transaction: t }
      );
    }

    await t.commit();
    return res
      .status(200)
      .json({ message: "Product updated successfully" });
  } catch (error) {
    await t.rollback();
    return res.status(500).json({ message: error.message });
  }
}

};

export default productController;
