import { z } from "zod";

// ✅ Create Stock Schema
export const createManagestockSchema = z.object({
  body: z.object({
    warehouse: z
      .string({ required_error: "Warehouse is required" })
      .min(1, "Warehouse cannot be empty"),

    store: z
      .string({ required_error: "Store is required" })
      .min(1, "Store cannot be empty"),

    product: z
      .string({ required_error: "Product is required" })
      .min(1, "Product cannot be empty"),

    resResponsible_Person: z
      .string({ required_error: "Responsible Person is required" })
      .min(1, "Responsible Person cannot be empty"),

    quantity: z
      .number({ required_error: "Quantity is required", invalid_type_error: "Quantity must be a number" })
      .int("Quantity must be an integer")
      .min(0, "Quantity cannot be negative"),

    created_by: z.string().optional(),
    updated_by: z.string().optional(),
  }),
});
// ✅ Update Stock Schema
export const updateManagestockSchema = z.object({
  body: z.object({
    warehouse: z.string().min(1).optional(),
    store: z.string().min(1).optional(),
    product: z.string().min(1).optional(),
    resResponsible_Person: z.string().min(1).optional(),
    quantity: z
      .number({ invalid_type_error: "Quantity must be a number" })
      .int()
      .min(0, "Quantity cannot be negative")
      .optional(),

    created_by: z.string().optional(),
    updated_by: z.string().optional(),
  }),
});
// ✅ Validate ManageStock ID (UUID)
export const managestockIdSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid stock ID format"),
  }),
});
