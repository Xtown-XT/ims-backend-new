import { z } from "zod";

// -----------------------------
// ⭐ Common reusable fields
// -----------------------------
const supplierBaseSchema = {
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().optional(),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  phone: z
    .string()
    .min(10, "Phone must be at least 10 digits")
    .max(15, "Phone cannot exceed 15 digits"),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  postal_code: z.string().optional(),
};

// -----------------------------
// ⭐ CREATE Supplier
// -----------------------------
export const createSupplierSchema = z.object({
  ...supplierBaseSchema,
});

// -----------------------------
// ⭐ UPDATE Supplier (all fields optional)
// -----------------------------
export const updateSupplierSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  email: z.string().email("Invalid email").optional(),
  phone: z
    .string()
    .min(10, "Phone must be at least 10 digits")
    .max(15, "Phone cannot exceed 15 digits")
    .optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  postal_code: z.string().optional(),
});

// -----------------------------
// ⭐ PARAM Validation (ID)
// -----------------------------
export const idParamSchema = z.object({
  id: z.string().uuid("Invalid ID format"),
});

// -----------------------------
// ⭐ GET ALL Suppliers (Pagination + Search)
// -----------------------------
export const getAllSupplierQuerySchema = z.object({
  search: z.string().optional(),
  page: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : 1)),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : 10)),
  orderBy: z.string().optional().default("createdAt"),
  order: z
    .string()
    .optional()
    .transform((val) => (val ? val.toUpperCase() : "ASC"))
    .refine((val) => ["ASC", "DESC"].includes(val), {
      message: "order must be ASC or DESC",
    }),
});

// -----------------------------
// ⭐ DELETE Supplier
// -----------------------------
export const deleteSupplierSchema = z.object({
  id: z.string().uuid("Invalid ID format"),
});

// -----------------------------
// ⭐ RESTORE Supplier (Optional)
// -----------------------------
export const restoreSupplierSchema = z.object({
  id: z.string().uuid("Invalid ID format"),
});
