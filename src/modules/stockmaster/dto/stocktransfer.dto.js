import { z } from "zod";

// ✅ Create Stock Transfer Schema
export const createStocktransferSchema = z.object({
  body: z.object({
    warehouse_from: z
      .string({ required_error: "Source warehouse is required" })
      .min(1, "Source warehouse cannot be empty"),

    warehouse_to: z
      .string({ required_error: "Destination warehouse is required" })
      .min(1, "Destination warehouse cannot be empty"),

    reference_number: z
      .string({ required_error: "Reference number is required" })
      .min(1, "Reference number cannot be empty")
      .max(100, "Reference number cannot exceed 100 characters"),

    no_of_products: z
      .string({ required_error: "Number of products is required" })
      .min(1, "Number of products cannot be empty"),

    quatity_transferred: z
      .string({ required_error: "Quantity transferred is required" })
      .min(1, "Quantity transferred cannot be empty"),

    created_by: z.string().optional(),
    updated_by: z.string().optional(),
  }),
});

// ✅ Update Stock Transfer Schema
export const updateStocktransferSchema = z.object({
  body: z.object({
    warehouse_from: z.string().min(1).optional(),
    warehouse_to: z.string().min(1).optional(),
    reference_number: z.string().min(1).max(100).optional(),
    no_of_products: z.string().min(1).optional(),
    quatity_transferred: z.string().min(1).optional(),

    created_by: z.string().optional(),
    updated_by: z.string().optional(),
  }),
});

// ✅ Validate Stock Transfer ID (UUID)
export const stocktransferIdSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid stock transfer ID format"),
  }),
});
