import { z } from "zod";

export const createBrandSchema = z.object({
  body: z.object({
    brand_name: z
      .string({ required_error: "Brand name is required" })
      .min(2, "Brand name must be at least 2 characters"),
    is_active: z.boolean().optional(),
    created_by: z.string().optional(),
    updated_by: z.string().optional(),
    }),
});

export const updateBrandSchema = z.object({
  body: z.object({
    brand_name: z.string().min(2).optional(),   
    is_active: z.boolean().optional(),
    created_by: z.string().optional(),
    updated_by: z.string().optional(),
  }),
});

export const brandIdSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid brand ID format"),
  }),
});