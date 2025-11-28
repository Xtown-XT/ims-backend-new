import { z } from "zod";

/* ============================================================
   COMPONENT SCHEMAS (5 MODELS)
   ============================================================ */

// 1️⃣ ProductInfo Model Validation
const productInfoSchema = z.object({
  store_id: z.string().uuid(),
  warehouse_id: z.string().uuid(),

  product_name: z.string().min(2),
  slug: z.string().optional(),
  sku: z.string().optional(),

  category_id: z.string().uuid(),
  sub_category_id: z.string().uuid().optional(),
  brand_id: z.string().uuid().optional(),
  unit_id: z.string().uuid().optional(),

  barcode_symbology_id: z.string().optional(),

  selling_type: z.enum(["online", "pos"]).optional().default("pos"),

  description: z.string().optional(),
});

// 2️⃣ SingleProduct Model
const singleProductSchema = z.object({
  quantity: z.number().int().nonnegative().optional().default(0),
  quantity_alert: z.number().int().nonnegative().optional(),
  price: z.number().nonnegative().optional(),

  tax_id: z.string().uuid().optional(),
  tax_type: z.enum(["inclusive", "exclusive"]).optional(),

  discount_type: z.enum(["percentage", "fixed"]).optional(),
  discount_value: z.number().nonnegative().optional(),
});

// 3️⃣ VariantProduct Model
// const variantProductSchema = z.object({
//   sku: z.string().optional(),
//   attributes: z.record(z.string(), z.any()), // e.g., { size: "XL", color: "Blue" }
//   price: z.number().nonnegative().optional(),
//   stock: z.number().int().nonnegative().optional(),
// });

const variantProductSchema = z.object({
  attribute_name: z.string().min(1, "Attribute name is required"),   // e.g., "color"
  attribute_value: z.string().min(1, "Attribute value is required"), // e.g., "red"
  sku: z.string().min(1, "SKU is required"),
  quantity: z.number().int().nonnegative({
    message: "Quantity must be a positive integer",
  }),
  price: z.number().nonnegative({
    message: "Price must be a positive number",
  }),
});

// 4️⃣ ProductImage Model
const productImageSchema = z.object({
  image_url: z.string().optional(),
  alt_text: z.string().optional(),
});

// 5️⃣ CustomFields Model
const customFieldsSchema = z.object({
  warranty_id: z.string().uuid().optional(),
  manufacturer: z.string().optional(),
  manufactured_date: z.string().optional(),
  expiry_on: z.string().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});


/* ============================================================
   FULL PRODUCT SCHEMAS
   ============================================================ */

// ✔ Create Product
export const createProductSchema = z.object({
  productInfo: productInfoSchema,
  singleProduct: singleProductSchema.optional(),
  variantProducts: z.array(variantProductSchema).optional(),
  images: z.array(productImageSchema).optional(),
  customFields: customFieldsSchema.optional(),
});

// ✔ Update Product (PATCH style — all fields optional)
export const updateProductSchema = z.object({
  productInfo: productInfoSchema.partial(),
  singleProduct: singleProductSchema.partial().optional(),
  variantProducts: z.array(variantProductSchema.partial()).optional(),
  images: z.array(productImageSchema).optional(),
  customFields: customFieldsSchema.partial().optional(),
});

// ✔ ID Validation
export const idSchema = z.object({
  id: z.string().min(1, "ID is required"),
});
