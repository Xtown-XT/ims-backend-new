import { z } from "zod";

export const createExpenseSchema = z.object({
  body: z.object({
    expense: z
      .string({ required_error: "Expense name is required" })
      .min(1, "Expense name cannot be empty"),

    description: z
      .string({ required_error: "Description is required" })
      .min(1, "Description cannot be empty"),

    category_id: z
      .string({ required_error: "Category ID is required" })
      .uuid("Invalid category ID format"),

    date: z
      .string({ required_error: "Date is required" })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
      }),

    amount: z
      .number({ required_error: "Amount is required" })
      .positive("Amount must be greater than 0"),

    status: z.enum(["paid", "pending", "cancelled"], {
      required_error: "Status is required",
    }),
  }),
});


export const expenseIdSchema = z.object({
  params: z.object({
    id: z
      .string({ required_error: "Expense ID is required" })
      .uuid("Invalid expense ID"),
  }),
});

export const updateExpenseSchema = z.object({
  body: z.object({
    expense: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    category_id: z.string().uuid().optional(),
    date: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
      })
      .optional(),
    amount: z.number().positive().optional(),
    status: z.enum(["paid", "pending", "cancelled"]).optional(),
  }),
});
