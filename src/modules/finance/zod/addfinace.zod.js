import { z } from "zod";

export const expenseCategorySchema = z.object({
  category_name: z
    .string({
      required_error: "category_name is required",
    })
    .min(2, "category_name must be at least 2 characters"),

  description: z
    .string()
    .optional()
    .nullable(),

  is_active: z
    .boolean()
    .optional(),

  created_by: z.string().optional().nullable(),
});

export const expenseCategoryUpdateSchema = z.object({
  category_name: z
    .string()
    .min(2, "category_name must be at least 2 characters")
    .optional(),

  description: z.string().optional().nullable(),

  is_active: z.boolean().optional(),

  updated_by: z.string().optional().nullable(),
});
