import { z } from "zod";

/**
 * 🟢 Create Variant Schema
 */
export const variantSchema = z.object({
  body: z.object({
    variant_name: z
      .string({
        required_error: "Variant name is required",
        invalid_type_error: "Variant name must be a string",
      })
      .min(1, "Variant name cannot be empty"),

    // Accepts either comma-separated string or array of strings
    values: z.union([
      z
        .string({
          required_error: "Values are required",
          invalid_type_error: "Values must be a string or array",
        })
        .min(1, "Values cannot be empty"),
      z
        .array(
          z
            .string({
              required_error: "Each value must be a string",
            })
            .min(1, "Value cannot be empty")
        )
        .nonempty("At least one value is required"),
    ]),

    status: z
      .boolean({
        invalid_type_error: "Status must be a boolean value",
      })
      .optional()
      .default(true),
  }),
});

/**
 * 🟠 Update Variant Schema
 */
export const variantUpdateSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "Variant ID is required",
      })
      .uuid("Invalid variant ID format"),
  }),
  body: z.object({
    variant_name: z
      .string({
        invalid_type_error: "Variant name must be a string",
      })
      .min(1, "Variant name cannot be empty")
      .optional(),

    values: z
      .union([
        z
          .string({
            invalid_type_error: "Values must be a string or array",
          })
          .min(1, "Values cannot be empty"),
        z
          .array(
            z
              .string({
                required_error: "Each value must be a string",
              })
              .min(1, "Value cannot be empty")
          )
          .nonempty("At least one value is required"),
      ])
      .optional(),

    status: z
      .boolean({
        invalid_type_error: "Status must be a boolean value",
      })
      .optional(),
  }),
});

/**
 * 🔵 Get Variant by ID Schema
 */
export const variantIdSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "Variant ID is required",
      })
      .uuid("Invalid variant ID format"),
  }),
});

/**
 * 🔴 Delete Variant Schema
 */
export const variantDeleteSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "Variant ID is required",
      })
      .uuid("Invalid variant ID format"),
  }),
});
