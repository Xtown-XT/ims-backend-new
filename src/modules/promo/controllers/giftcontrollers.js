import GiftCard from "../models/gift.models.js";
// import Customer from "../../peoplesmaster/models/addcustomers.models.js";
// import { formatDates } from "../../../utils/dataFormatter.js";


// import GiftCard from "../models/gift.models.js";
import Customer from "../../peoplesmaster/models/addcustomers.models.js";
import BaseService from "../../../services/service.js";

const giftService = new BaseService(GiftCard);

export const creategiftcard = async (req, res) => {
  try {
    const { giftcard_no, customer_id, issued_date, expiry_date, amount, balance, status } = req.body;

    // status should not be validated using "||" because false = 0 (valid)
    if (!giftcard_no || !customer_id || !issued_date || !expiry_date || !amount || !balance) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const data = await giftService.create({
      giftcard_no,
      customer_id,
      issued_date,
      expiry_date,
      amount,
      balance,
      status: status ?? true, // default true if not provided
    });

    return res.status(201).json({
      message: "Gift card created successfully",
      data,
    });

  } catch (error) {
    console.error("Error creating gift card:", error);
    return res.status(500).json({
      message: "Failed to create gift card",
      error: error.message,
    });
  }
};


// 🔵 Get All Gift Cards
export const getAllgiftcards = async (req, res) => {
      try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const giftcards = await GiftCard.findAndCountAll({
      limit: Number(limit),
      offset,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Customer,
          as: "customer",   // alias must match associations
          attributes: [
            "id",
            "first_name",
            "last_name",
            "email",
            // "phone_number",
            "image"
          ],
        },
      ],
    });

    const BASE_URL = `${req.protocol}://${req.get("host")}`;

    // Append customer image URL
    const formatted = giftcards.rows.map(gc => ({
      ...gc.dataValues,
      customer: gc.customer
        ? {
            ...gc.customer.dataValues,
            image: gc.customer.image
              ? `${BASE_URL}/uploads/customers/${gc.customer.image}`
              : null,
          }
        : null,
    }));

    return res.status(200).json({
      message: "Gift cards fetched successfully",
      data: {
        total: giftcards.count,
        page: Number(page),
        limit: Number(limit),
        giftcards: formatted,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch gift cards",
      error: error.message,
    });
  }
};
// 🟣 Get Gift Card by ID
export const getgiftcardById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await giftService.getById(id);

    if (!data) return res.status(404).json({ message: "Gift card not found" });

    return res.status(200).json({
      message: "Gift card fetched successfully",
      data,
    });

  } catch (error) {
    console.error("Error fetching gift card:", error);
    return res.status(500).json({
      message: "Failed to fetch gift card",
      error: error.message,
    });
  }
};

// 🟠 Update Gift Card
export const updategiftcard = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await giftService.update(id, req.body);

    return res.status(200).json({
      message: "Gift card updated successfully",
      data: updated,
    });

  } catch (error) {
    console.error("Error updating gift card:", error);
    return res.status(500).json({
      message: "Failed to update gift card",
      error: error.message,
    });
  }}


// 🔴 Delete Gift Card
export const deletegiftcard = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await giftService.delete(id);

    return res.status(200).json({
      message: "Gift card deleted successfully",
      data: deleted,
    });

  } catch (error) {
    console.error("Error deleting gift card:", error);
    return res.status(500).json({
      message: "Failed to delete gift card",
      error: error.message,
    });
  }
}




export default {
  creategiftcard,
  getAllgiftcards,
  getgiftcardById,
  updategiftcard,
  deletegiftcard
};
