import { z } from "zod";

// ✅ Create Unit Schema
export const createUnitSchema = z.object({
  body: z.object({
    unit_name: z
      .string({ required_error: "Unit name is required" })
      .min(2, "Unit name must be at least 2 characters"),

    short_name: z
      .string({ required_error: "Short name is required" })
      .min(1, "Short name cannot be empty")
      .max(10, "Short name can be at most 10 characters"),

    is_active: z.boolean().optional(),

    created_by: z.string().uuid().optional(),
    updated_by: z.string().uuid().optional(),
  }),
});

// ✅ Update Unit Schema (all optional)
export const updateUnitSchema = z.object({
  body: z.object({
    unit_name: z.string().min(2).optional(),
    short_name: z.string().min(1).max(10).optional(),
    is_active: z.boolean().optional(),
    created_by: z.string().uuid().optional(),
    updated_by: z.string().uuid().optional(),
  }),
});

// ✅ Unit ID Validation
export const unitIdSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid unit ID format"),
  }),
});
