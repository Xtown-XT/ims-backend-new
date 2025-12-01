import { z } from "zod";

// CREATE
export const createIncomeCategorySchema = z.object({
  code: z
    .string()
    .nonempty("Code is required")
    .regex(/^INC-[A-Z0-9]{5}$/, "Code must be in format INC-XXXXX"),

  name: z
    .string()
    .nonempty("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name cannot exceed 50 characters"),
});

// UPDATE
export const updateIncomeCategorySchema = z.object({
  code: z
    .string()
    .regex(/^INC-[A-Z0-9]{5}$/, "Invalid code format")
    .optional(),

  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name cannot exceed 50 characters")
    .optional(),
}).refine(
  (data) => Object.keys(data).length > 0,
  { message: "At least one field must be provided" }
);

// ID VALIDATION
export const idParamSchema = z.object({
  id: z.string().uuid("Invalid ID format"),
});

// QUERY VALIDATION
export const getAllIncomeQuerySchema = z.object({
  page: z.string().optional().default("1"),
  limit: z.string().optional().default("10"),
  search: z.string().optional().default(""),
  orderBy: z.string().optional().default("createdAt"),
  order: z.enum(["ASC", "DESC"]).optional().default("DESC"),
  includeInactive: z.enum(["true", "false"]).optional().default("false"),
});
