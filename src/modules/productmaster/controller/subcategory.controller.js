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
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const result = await subcategoryService.getAll({
      searchFields: ["subcategory_name", "category_code", "description"],
    });

    const formattedRows = result.rows.map((item) => {
      const json = item.toJSON();

      return {
        ...json,
        image: json.image
          ? `${baseUrl}${json.image.startsWith("/") ? "" : "/"}${json.image}`
          : null,
      };
    });

    return res.status(200).json({
      count: result.count,
      rows: formattedRows,
    });

  } catch (error) {
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

    const formatted = {
      ...json,
      image: json.image
        ? `${baseUrl}${json.image.startsWith("/") ? "" : "/"}${json.image}`
        : null,
    };

    return res.status(200).json(formatted);

  } catch (error) {
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
