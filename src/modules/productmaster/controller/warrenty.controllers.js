import Warranty from  "../models/warrenty.models.js"
import BaseService from "../../../services/service.js";

const warrantyService = new BaseService(Warranty);

/**
 * 🟢 Create Warranty
 */
export const createWarranty = async (req, res) => {
  try {
    const { warranty_name, duration, period, description, status } = req.body;

    if (!warranty_name || !duration || !period || !description) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const newWarranty = await warrantyService.create({
      warranty_name,
      duration,
      period,
      description,
      status: status ?? true,
    });

    res.status(201).json({
      message: "Warranty created successfully",
      data: newWarranty,
    });
  } catch (error) {
    console.error("Error creating warranty:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

/**
 * 🔵 Get All Warranties
 */
export const getAllWarranties = async (req, res) => {
   try {
    const { page, limit, search } = req.query;

    const warranties = await warrantyService.getAll({
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      search: search || "",
      orderBy: "createdAt",  // ✅ FIXED: capital A
      order: "DESC",
      searchFields: ["warranty_name", "description"],
    });

    res.status(200).json({
      message: "Warranties fetched successfully",
      data: warranties,
    });
  } catch (error) {
    console.error("Error fetching warranties:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

/**
 * 🟣 Get Warranty by ID
 */
export const getWarrantyById = async (req, res) => {
  try {
    const { id } = req.params;
    const warranty = await warrantyService.getById(id);

    res.status(200).json({
      message: "Warranty fetched successfully",
      data: warranty,
    });
  } catch (error) {
    console.error("Error fetching warranty:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

/**
 * 🟠 Update Warranty
 */
export const updateWarranty = async (req, res) => {
  try {
    const { id } = req.params;
    const { warranty_name, duration, period, description, status } = req.body;

    const updatedWarranty = await warrantyService.update(id, {
      warranty_name,
      duration,
      period,
      description,
      status,
    });

    res.status(200).json({
      message: "Warranty updated successfully",
      data: updatedWarranty,
    });
  } catch (error) {
    console.error("Error updating warranty:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

/**
 * 🔴 Delete Warranty
 */
export const deleteWarranty = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedWarranty = await warrantyService.delete(id);

    res.status(200).json({
      message: "Warranty deleted successfully",
      data: deletedWarranty,
    });
  } catch (error) {
    console.error("Error deleting warranty:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};