import { Op } from "sequelize";
import BaseService from "../../../services/service.js";
import Subcategory from "../models/subcategory.model.js";



// import { uploadSingle } from "../../../middleware/upload.js";

const subcategoryService = new BaseService(Subcategory);

export const createSubcategory = async (req, res) => {
  try {
    const data = { ...req.body };

    if (req.file) data.image = req.file.filename;

    if (!data.subcategory_name)
      return res.status(400).json({ message: "subcategory_name is required" });

    if (!data.category_id)
      return res.status(400).json({ message: "category_id is required" });

    // Add created_by from logged-in employee
    data.created_by = req.user?.id || null;

    const newRecord = await subcategoryService.create(data);

    return res.status(201).json({
      message: "Subcategory created successfully",
      data: newRecord,
    });

  } catch (error) {
    console.error("Error creating subcategory:", error);
    return res.status(500).json({
      message: "Failed to create subcategory",
      error: error.message,
    });
  }
};


// Get All Subcategories
export const getAllSubcategories = async (req, res) => {
  try {
    const {
      search = "",
      page = 1,
      limit = 10,
      orderBy = "createdAt",
      order = "ASC",
    } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const allowedOrderBy = ["createdAt", "updatedAt", "subcategory_name", "category_code"];

    const sortField = allowedOrderBy.includes(orderBy) ? orderBy : "createdAt";
    const sortOrder = ["ASC", "DESC"].includes(order.toUpperCase()) ? order.toUpperCase() : "ASC";

    // Fetch data from BaseService
    const result = await subcategoryService.getAll({
      search,
      page: pageNumber,
      limit: limitNumber,
      orderBy: sortField,
      order: sortOrder,
      searchFields: ["subcategory_name", "category_code", "description"],
      paranoid: false, // include soft deleted if needed
    });

    const BASE_URL = `${req.protocol}://${req.get("host")}`;

    // Add full image URL
    const formattedRows = result.rows.map((item) => {
      const json = item.toJSON();
      return {
        ...json,
        image: json.image
          ? `${BASE_URL}/uploads/subcategories/${json.image.startsWith("uploads/") ? json.image.split("/")[1] : json.image}`
          : null,
      };
    });

    return res.status(200).json({
      message: "Subcategories fetched successfully",
      data: {
        total: result.count,
        page: pageNumber,
        limit: limitNumber,
        subcategories: formattedRows,
      },
    });
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    return res.status(500).json({
      message: "Failed to fetch subcategories",
      error: error.message,
    });
  }
};


// Get Subcategory by ID
export const getSubcategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const record = await subcategoryService.getById(id);

    if (!record) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    const json = record.toJSON();

    // Build full image URL
    const formatted = {
      ...json,
      image: json.image
        ? `${baseUrl}/uploads/${json.image.startsWith("uploads/") ? json.image.split("/")[1] : json.image}`
        : null,
    };

    return res.status(200).json(formatted);

  } catch (error) {
    console.error("Error fetching subcategory:", error);
    return res.status(500).json({
      message: "Failed to fetch subcategory",
      error: error.message,
    });
  }
};

// Update Subcategory
export const updateSubcategory = async (req, res) => {
  try {
    const { id } = req.params;

    const data = { ...req.body };

    // Add updated_by from employee
    data.updated_by = req.user?.id || null;

    if (req.file) data.image = req.file.filename;

    const updated = await subcategoryService.update(id, data);

    return res.status(200).json({
      message: "Subcategory updated successfully",
      data: updated,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to update subcategory",
      error: error.message,
    });
  }
};

// Delete Subcategory
export const deleteSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await subcategoryService.delete(id);

    return res.status(200).json({
      message: "Subcategory deleted successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete subcategory",
      error: error.message,
    });
  }
};

export default {
  createSubcategory,
  getAllSubcategories,
  getSubcategoryById,
  updateSubcategory,
  deleteSubcategory,
};
