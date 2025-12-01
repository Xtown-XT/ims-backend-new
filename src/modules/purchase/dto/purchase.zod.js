import { z } from "zod";

/* ============================================================
   COMPONENT SCHEMAS (Purchase + PurchaseItem)
   ============================================================ */

/* -----------------------------
   1️⃣ PurchaseItem Schema
----------------------------- */
export const purchaseItemSchema = z.object({
  product_id: z.string().uuid(),
  qty: z.number().int().positive(),
  price: z.number().nonnegative(),
  discount: z.number().nonnegative().optional().default(0),
  tax_percent: z.number().nonnegative().optional().default(0),
  unit_price : z.number().nonnegative().optional().default(0),
});

/* After calculation (backend), tax_amount + total_cost are calculated.
   User should NOT pass them. */
export const calculatedPurchaseItemSchema = purchaseItemSchema.extend({
  tax_amount: z.number().nonnegative().optional().default(0),
  total_cost: z.number().nonnegative().optional().default(0),
});

/* -----------------------------
   2️⃣ Purchase Schema
----------------------------- */
export const purchaseSchema = z.object({
  supplier_id: z.string().uuid(),
  date: z.string().min(1, "Date is required"), // You convert to DATEONLY in controller
  reference: z.string().min(1),

  order_tax: z.number().nonnegative().optional().default(0),
  discount: z.number().nonnegative().optional().default(0),
  shipping: z.number().nonnegative().optional().default(0),

  status: z.enum(["pending", "ordered", "received", "cancelled"]),

  description: z.string().optional(),

  // Purchase items
  items: z
    .array(purchaseItemSchema)
    .min(1, "At least one purchase item is required"),
});

/* ============================================================
   FULL PURCHASE SCHEMAS
   ============================================================ */

// ✔ Create Purchase
export const createPurchaseSchema = purchaseSchema;

// ✔ Update Purchase (PATCH style — all fields optional)
export const updatePurchaseSchema = z.object({
  supplier_id: z.string().uuid().optional(),
  date: z.string().optional(),
  reference: z.string().optional(),

  order_tax: z.number().nonnegative().optional(),
  discount: z.number().nonnegative().optional(),
  shipping: z.number().nonnegative().optional(),

  status: z.enum(["pending", "ordered", "received", "cancelled"]).optional(),
  description: z.string().optional(),

  items: z.array(purchaseItemSchema).optional(),
});

// ✔ ID Validation
export const idSchema = z.object({
  id: z.string().uuid(),
});
