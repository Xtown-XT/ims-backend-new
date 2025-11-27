// import Discountadd from "../models/adddiscount.models.js";
// import BaseService from "../../../services/service.js";

// const discountService = new BaseService(Discountadd);

// // Create Discount
// export const Discountcreate = async (req, res) => {
//   try {
//     const data = req.body;
//     const discount = await discountService.create(data);

//     return res.status(201).json({
//       message: "Discount created successfully",
//       data: discount,
//     });
//   } catch (error) {
//     console.error("Create Discount Error:", error);
//     return res.status(500).json({ message: error.message });
//   }
// };

// // Get All Discounts
// export const getAllDiscount = async (req, res) => {
//   try {
//     const { page, limit, search } = req.query;

//     const result = await discountService.getAll({
//       page: page ? Number(page) : 1,
//       limit: limit ? Number(limit) : 10,
//       search: search || "",
//       searchFields: ["discount_name", "discount_plan", "applicable_for", "discount_type"],
//       orderBy: "createdAt",
//       order: "DESC",
//       includeInactive: true,
//     });

//     return res.status(200).json({
//       message: "Discounts fetched successfully",
//       data: result.rows,
//       total: result.count,
//       page: result.page,
//       limit: result.limit,
//       totalPages: result.totalPages,
//     });
//   } catch (error) {
//     console.error("Get All Discounts Error:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// // Get Discount by ID
// export const getDiscountById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const discount = await discountService.getById(id);

//     if (!discount) {
//       return res.status(404).json({ message: "Discount not found" });
//     }

//     return res.status(200).json({
//       message: "Discount fetched successfully",
//       data: discount,
//     });
//   } catch (error) {
//     console.error("Get Discount Error:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// // Update Discount
// export const updateDiscount = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updated = await discountService.update(id, req.body);

//     if (!updated) {
//       return res.status(404).json({ message: "Discount not found" });
//     }

//     return res.status(200).json({
//       message: "Discount updated successfully",
//     });
//   } catch (error) {
//     console.error("Update Discount Error:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// // Soft Delete (paranoid true)
// export const deleteDiscount = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await discountService.delete(id);

//     return res.status(200).json({
//       message: "Discount deleted successfully",
//     });
//   } catch (error) {
//     console.error("Delete Discount Error:", error);
//     return res.status(404).json({ message: "Discount not found" });
//   }
// };

// export default {
//   Discountcreate,
//   getAllDiscount,
//   getDiscountById,
//   updateDiscount,
//   deleteDiscount
// };




import Discount from "../models/adddiscount.models.js";
import BaseService from "../../../services/service.js";

const discountService = new BaseService(Discount);

// 🟢 Create Discount
export const createDiscount = async (req, res) => {
  try {
    const {
      discount_name,
      discount_plan,
      discount_plan_id,   // <-- ADD THIS
      applicable_for,
      valid_from,
      valid_till,
      discount_type,
      valid_days,
      status
    } = req.body;

    if (
      !discount_name ||
      !discount_plan_id ||   // <-- VALIDATE THIS
      !discount_plan ||
      !applicable_for ||
      !valid_from ||
      !valid_till ||
      !discount_type ||
      !valid_days
    ) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const data = await discountService.create({
      discount_name,
      discount_plan,
      discount_plan_id,    // <-- PASS THIS TO DB
      applicable_for,
      valid_from,
      valid_till,
      discount_type,
      valid_days,
      status: status ?? true,
    });

    return res.status(201).json({
      message: "Discount created successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// 🔵 Get All Discounts
export const getAllDiscounts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const result = await discountService.getAll({
      page: Number(page),
      limit: Number(limit),
      search,
      searchFields: [
        "discount_name",
        "discount_plan",
        "applicable_for",
        "discount_type"
      ],
      orderBy: "createdAt",
      order: "DESC",
      includeInactive: true,
    });

    return res.status(200).json({
      message: "Discounts fetched successfully",
      data: result.rows,
      total: result.count,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    });
  } catch (error) {
    console.error("Get All Discounts Error:", error);
    return res.status(500).json({ message: "Failed to fetch discounts" });
  }
};

// 🟣 Get Discount by ID
export const getDiscountById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await discountService.getById(id);

    return res.status(200).json({
      message: "Discount fetched successfully",
      data,
    });
  } catch (error) {
    console.error("Get Discount Error:", error);
    return res.status(404).json({ message: "Discount not found" });
  }
};

// 🟠 Update Discount
export const updateDiscount = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await discountService.update(id, req.body);

    return res.status(200).json({
      message: "Discount updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Update Discount Error:", error);
    return res.status(404).json({ message: "Discount not found" });
  }
};

// 🔴 Delete Discount (Soft Delete)
export const deleteDiscount = async (req, res) => {
  try {
    const { id } = req.params;
    await discountService.delete(id);

    return res.status(200).json({
      message: "Discount deleted successfully",
    });
  } catch (error) {
    console.error("Delete Discount Error:", error);
    return res.status(404).json({ message: "Discount not found" });
  }
};

export default {
  createDiscount,
  getAllDiscounts,
  getDiscountById,
  updateDiscount,
  deleteDiscount
};
