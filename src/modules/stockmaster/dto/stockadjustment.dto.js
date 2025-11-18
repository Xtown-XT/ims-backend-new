import { z } from "zod";

// ✅ Create Stock Adjustment Schema
export const createStockAdjustmentSchema = z.object({
  body: z.object({
    product: z
      .string({ required_error: "Product is required" })
      .min(1, "Product name cannot be empty"),

    warehouse: z
      .string({ required_error: "Warehouse is required" })
      .min(1, "Warehouse cannot be empty"),

    reference_number: z
      .string({ required_error: "Reference number is required" })
      .min(1, "Reference number cannot be empty"),

    store: z
      .string({ required_error: "Store is required" })
      .min(1, "Store cannot be empty"),

    responsible_person: z
      .string({ required_error: "Responsible person is required" })
      .min(1, "Responsible person cannot be empty"),

    quantity: z
      .number({ required_error: "Quantity is required" })
      .int("Quantity must be an integer")
      .nonnegative("Quantity cannot be negative"),

    notes: z.string().optional(),
    created_by: z.string().optional(),
    updated_by: z.string().optional(),
  }),
});

// ✅ Update Stock Adjustment Schema (All fields optional)
export const updateStockAdjustmentSchema = z.object({
  body: z.object({
    product: z.string().min(1).optional(),
    warehouse: z.string().min(1).optional(),
    reference_number: z.string().min(1).optional(),
    store: z.string().min(1).optional(),
    responsible_person: z.string().min(1).optional(),
    quantity: z.number().int().nonnegative().optional(),
    notes: z.string().optional(),
    created_by: z.string().optional(),
    updated_by: z.string().optional(),
  }),
});

// ✅ Validate ID (UUID format)
export const stockAdjustmentIdSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid stock adjustment ID format"),
  }),
});
