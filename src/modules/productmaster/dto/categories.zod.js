import { z } from "zod";

// ✅ Create Category Schema
export const createCategorySchema = z.object({
  body: z.object({
    category_name: z
      .string({ required_error: "Category name is required" })
      .min(3, "Category name must be at least 3 characters"),

    category_slug: z
      .string()
      .max(200, "Category slug can be max 200 characters")
      .optional(),

    is_active: z.boolean().optional(),

    created_by: z.string().uuid().optional(),
    updated_by: z.string().uuid().optional(),
  }),
});

// ✅ Update Category Schema (all fields optional)
export const updateCategorySchema = z.object({
  body: z.object({
    category_name: z.string().min(3).optional(),
    category_slug: z.string().max(200).optional(),
    is_active: z.boolean().optional(),
    created_by: z.string().uuid().optional(),
    updated_by: z.string().uuid().optional(),
  }),
});

// ✅ Validate Category ID (UUID)
export const categoryIdSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid category ID format"),
  }),
});
