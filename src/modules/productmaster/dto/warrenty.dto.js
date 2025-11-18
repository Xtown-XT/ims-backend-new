import { z } from "zod";

/**
 * 🟢 Create Warranty Validation Schema
 */
export const warrantySchema = z.object({
  warranty_name: z
    .string({
      required_error: "Warranty name is required",
    })
    .min(2, "Warranty name must be at least 2 characters long")
    .max(100, "Warranty name must not exceed 100 characters"),

  duration: z
    .number({
      required_error: "Duration is required",
      invalid_type_error: "Duration must be a number",
    })
    .positive("Duration must be greater than 0"),

  period: z.enum(["Days", "Months", "Years"], {
    required_error: "Period is required",
    invalid_type_error: "Invalid period value",
  }),

  description: z
    .string({
      required_error: "Description is required",
    })
    .min(5, "Description must be at least 5 characters long"),

  status: z
    .boolean({
      invalid_type_error: "Status must be a boolean (true/false)",
    })
    .optional(),
});

/**
 * 🟠 Update Warranty Validation Schema
 */
export const warrantyUpdateSchema = z.object({
  warranty_name: z
    .string()
    .min(2, "Warranty name must be at least 2 characters long")
    .max(100, "Warranty name must not exceed 100 characters")
    .optional(),

  duration: z
    .number({
      invalid_type_error: "Duration must be a number",
    })
    .positive("Duration must be greater than 0")
    .optional(),

  period: z.enum(["Days", "Months", "Years"]).optional(),

  description: z
    .string()
    .min(5, "Description must be at least 5 characters long")
    .optional(),

  status: z
    .boolean({
      invalid_type_error: "Status must be a boolean (true/false)",
    })
    .optional(),
});

/**
 * 🔵 Get Warranty by ID Validation Schema
 */
export const warrantyIdSchema = z.object({
  id: z
    .string({
      required_error: "Warranty ID is required",
    })
    .uuid("Invalid Warranty ID format"),
});

/**
 * 🔴 Delete Warranty Validation Schema
 */
export const warrantyDeleteSchema = z.object({
  id: z
    .string({
      required_error: "Warranty ID is required",
    })
    .uuid("Invalid Warranty ID format"),
});
