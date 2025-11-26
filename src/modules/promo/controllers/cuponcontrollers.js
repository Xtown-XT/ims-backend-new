import Cupon from "../models/cupon.models.js";
import BaseService from "../../../services/service.js";

const cuponService = new BaseService(Cupon);

/**
 * 🟢 Create Cupon
 */
export const createCupon = async (req, res) => {
   try {
    const {
      cupon_name,
      type,
      discount,
      limit,
      product,
      start_date,
      end_date,
      description,
      status
    } = req.body;

    if (!cupon_name || !type || !discount || !limit || !product || !start_date || !end_date) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    // 🔥 Auto-generate unique coupon code
    const generateCode = () => {
      return (
        "CPN-" +
        Math.random().toString(36).substring(2, 8).toUpperCase() +
        "-" +
        Date.now().toString().slice(-4)
      );
    };

    const autoCode = generateCode();

    const newCupon = await cuponService.create({
      cupon_name,
      code: autoCode, // ⬅ automatically generated
      type,
      discount,
      limit,
      product,
      start_date,
      end_date,
      description,
      status: status ?? true
    });

    return res.status(201).json({
      message: "Cupon created successfully",
      data: newCupon,
    });

  } catch (error) {
    console.error("Error creating cupon:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
/**
 * 🔵 Get All Cupons (with pagination + search)
 */
export const getAllCupons = async (req, res) => {
  try {
    const { page, limit, search } = req.query;

    const cupons = await cuponService.getAll({
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      search: search || "",
      orderBy: "createdAt",
      order: "DESC",
      searchFields: ["cupon_name", "code", "description"],
    });

    res.status(200).json({
      message: "Cupons fetched successfully",
      data: cupons,
    });
  } catch (error) {
    console.error("Error fetching cupons:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

/**
 * 🟣 Get Cupon by ID
 */
export const getCuponById = async (req, res) => {
  try {
    const { id } = req.params;
    const cupon = await cuponService.getById(id);

    res.status(200).json({
      message: "Cupon fetched successfully",
      data: cupon,
    });
  } catch (error) {
    console.error("Error fetching cupon:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

/**
 * 🟠 Update Cupon
 */
export const updateCupon = async (req, res) => {
  try {
    const { id } = req.params;
    const { cupon_name, code, type, discount, limit, product, start_date, end_date, description, status } = req.body;

    const updatedCupon = await cuponService.update(id, {
      cupon_name,
      code,
      type,
      discount,
      limit,
      product,
      start_date,
      end_date,
      description,
      status,
    });

    res.status(200).json({
      message: "Cupon updated successfully",
      data: updatedCupon,
    });
  } catch (error) {
    console.error("Error updating cupon:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

/**
 * 🔴 Delete Cupon
 */
export const deleteCupon = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCupon = await cuponService.delete(id);

    res.status(200).json({
      message: "Cupon deleted successfully",
      data: deletedCupon,
    });
  } catch (error) {
    console.error("Error deleting cupon:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
export default{createCupon,getAllCupons,getCuponById,updateCupon,deleteCupon}
