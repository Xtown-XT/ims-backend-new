import { z } from "zod";

export const createCuponSchema = z.object({
  body: z.object({
    cupon_name: z.string().min(1, "Coupon name is required"),
    type: z.enum(["percentage", "fixed"], { required_error: "Type is required" }),
    discount: z.number().min(1, "Discount must be greater than 0"),
    limit: z.number().min(1, "Limit is required"),
    product: z.string().min(1, "Product is required"),
    start_date: z.string().min(1, "Start date is required"),
    end_date: z.string().min(1, "End date is required"),
    description: z.string().optional(),
    status: z.boolean().optional(),
  }),
});

export const updateCuponSchema = z.object({
  body: z.object({
    cupon_name: z.string().optional(),
    code: z.string().optional(),
    type: z.enum(["percentage", "fixed"]).optional(),
    discount: z.number().optional(),
    limit: z.number().optional(),
    product: z.string().optional(),
    start_date: z.string().optional(),
    end_date: z.string().optional(),
    description: z.string().optional(),
    status: z.boolean().optional(),
  }),
});

export const cuponIdSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid ID format"),
  }),
});
