import Discount from "../models/adddiscountplan.models.js";
import BaseService from "../../../services/service.js";

const discountService = new BaseService(Discount);

// Create Discount
export const createDiscountplan = async (req, res) => {
  try {
    const { plan_name, customer, status } = req.body;

    const discount = await discountService.create({
      plan_name,
      customer,
      status: status ?? true
    });

    return res.status(201).json({
      message: "Discount created successfully",
      data: discount
    });
  } catch (error) {
    console.error("Create Discount Error:", error);
    return res.status(500).json({ message: error.message });
  }
};
// Get All Discounts
export const getAllDiscountsplan = async (req, res) => {
 try {
    const { page, limit, search } = req.query;

    const result = await discountService.getAll({
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 10,
      search: search || "",
      searchFields: ["plan_name", "customer"],
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
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get Discount by ID
export const getDiscountByIdplan = async (req, res) => {
   try {
    const { id } = req.params;
    const discount = await discountService.getById(id);

    return res.status(200).json({
      message: "Discount fetched successfully",
      data: discount,
    });
  } catch (error) {
    console.error("Get Discount Error:", error);
    return res.status(404).json({ message: "Discount not found" });
  }
};

// Update Discount
export const updateDiscountplan = async (req, res) => {
    try {
    const { id } = req.params;
    await discountService.update(id, req.body);

    return res.status(200).json({
      message: "Discount updated successfully",
    });
  } catch (error) {
    console.error("Update Discount Error:", error);
    return res.status(404).json({ message: "Discount not found" });
  }
};
// Soft Delete Discount (paranoid: true)
export const deleteDiscountplan = async (req, res) => {
  try {
    const { id } = req.params;
    await discountService.delete(id);

    return res.status(200).json({ message: "Discount deleted successfully" });
  } catch (error) {
    console.error("Delete Discount Error:", error);
    return res.status(404).json({ message: "Discount not found" });
  }
};

export default {createDiscountplan , getAllDiscountsplan, getDiscountByIdplan, updateDiscountplan, deleteDiscountplan };
