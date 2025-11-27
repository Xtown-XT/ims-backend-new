import { z } from "zod";

// ✅ Create Subcategory Schema
// export const createSubcategorySchema = z.object({
//   body: z.object({
//     subcategory_name: z
//       .string({ required_error: "Subcategory name is required" })
//       .min(3, "Subcategory name must be at least 3 characters"),

//     category_id: z  
//         .string({ required_error: "Category ID is required" })
//         .uuid("Invalid Category ID format"),

//     category_code: z
//       .string()
//       .max(100, "Category code can be max 100 characters")
//       .optional(),
//     Description: z.string().max(1000).optional(),

//     is_active: z.boolean().optional(),
//     created_by: z.string().optional(),
//     updated_by: z.string().optional(),
//   }),
// });

// dto/subcategory.zod.js
export const createSubcategorySchema = z.object({
  body: z.object({
    subcategory_name: z
      .string({ required_error: "Subcategory name is required" })
      .min(3),
    category_id: z.string({ required_error: "Category ID is required" }).uuid(),
    category_code: z.string().max(100).optional(),
    description: z.string().max(1000).optional(), // lowercase
    is_active: z.boolean().optional(),
    created_by: z.string().optional(),
    updated_by: z.string().optional(),
  }),
});


// ✅ Update Subcategory Schema (all fields optional)
export const updateSubcategorySchema = z.object({
  body: z.object({
    subcategory_name: z.string().min(3).optional(),

    category_id: z.string().uuid().optional(),
    category_code: z.string().max(100).optional(),
    Description: z.string().max(1000).optional(),
    is_active: z.boolean().optional(),
    created_by: z.string().optional(),
    updated_by: z.string().optional(),
  }),
});
// ✅ Validate Subcategory ID (UUID)
export const subcategoryIdSchema = z.object({
    params: z.object({
        id: z.string().uuid("Invalid subcategory ID format"),
    }),
});