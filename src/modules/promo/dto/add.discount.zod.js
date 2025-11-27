import { z } from "zod";

export const createDiscountSchema = z.object({
  body: z.object({
    plan_name: z.string({
      required_error: "plan_name is required"
    }).min(1, "plan_name cannot be empty"),

    customer: z.string({
      required_error: "customer is required"
    }).min(1, "customer cannot be empty"),

    status: z.boolean().optional()
  })
});

export const updateDiscountSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid discount ID")
  }),
  body: z.object({
    plan_name: z.string().min(1).optional(),
    customer: z.string().min(1).optional(),
    status: z.boolean().optional()
  })
    .refine(data => Object.keys(data).length > 0, {
      message: "At least one field is required to update",
    }),
});

export const discountIdSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid discount ID")
  }),
});
