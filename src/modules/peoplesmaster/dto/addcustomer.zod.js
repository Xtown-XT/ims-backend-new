import { z } from "zod";

// -----------------------------
// ⭐ Common reusable fields
// -----------------------------
const customerBaseSchema = {
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
// ⭐ CREATE Customer
// -----------------------------
export const createCustomerSchema = z.object({
  ...customerBaseSchema,
});

// -----------------------------
// ⭐ UPDATE Customer (all fields optional)
// -----------------------------
export const updateCustomerSchema = z.object({
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
// ⭐ GET ALL Customers (Pagination + Search)
// -----------------------------
export const getAllCustomerQuerySchema = z.object({
  search: z.string().optional(),
  page: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : 1)),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : 10)),
  orderBy: z
    .string()
    .optional()
    .default("createdAt"),
  order: z
    .string()
    .optional()
    .transform((val) => (val ? val.toUpperCase() : "ASC"))
    .refine((val) => ["ASC", "DESC"].includes(val), {
      message: "order must be ASC or DESC",
    }),
});

// -----------------------------
// ⭐ DELETE Customer
// -----------------------------
export const deleteCustomerSchema = z.object({
  id: z.string().uuid("Invalid ID format"),
});

// -----------------------------
// ⭐ RESTORE Customer (Optional)
// -----------------------------
export const restoreCustomerSchema = z.object({
  id: z.string().uuid("Invalid ID format"),
});
