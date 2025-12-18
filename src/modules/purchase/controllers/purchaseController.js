import Purchase from "../models/purchase.model.js";
import PurchaseItem from "../models/purchaseItem.model.js";
import { sequelize } from "../../../db/index.js";
import BaseService from "../../../services/service.js";

const purchaseService = new BaseService(Purchase);
const purchaseItemService = new BaseService(PurchaseItem);

// ===============================
// CREATE PURCHASE
// ===============================
const createPurchase = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const {
      supplier_id,
      reference,
      date,
      order_tax,
      discount,
      shipping,
      status,
      description,
      items,
    } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Purchase items are required" });
    }

    const created_by = req.user?.id || "system";

    // Calculate total cost
    let totalCost = 0;
    items.forEach((p) => {
      const unitPrice = p.price - p.discount + p.tax_amount;
      totalCost += unitPrice * p.qty;
    });

    // Create purchase
    const purchase = await Purchase.create(
      {
        supplier_id,
        reference,
        date,
        order_tax,
        discount,
        shipping,
        status,
        description,
        total_cost: totalCost,
        created_by,
        updated_by: created_by,
      },
      { transaction: t }
    );

    // Create all purchase items
    for (const p of items) {
      const unitPrice = p.price - p.discount + p.tax_amount;

      await PurchaseItem.create(
        {
          purchase_id: purchase.id,
          product_id: p.product_id,
          qty: p.qty,
          price: p.price,
          discount: p.discount,
          tax_percent: p.tax_percent,
          tax_amount: p.tax_amount,
          unit_price: unitPrice,
          total_cost: unitPrice * p.qty,
          created_by,
          updated_by: created_by,
        },
        { transaction: t }
      );
    }

    await t.commit();
    res.status(201).json({ message: "Purchase created successfully" });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ message: err.message });
  }
};

// ===============================
// GET ALL PURCHASES (WITH PAGINATION)
// ===============================
const getAllPurchases = async (req, res) => {
  try {
    const {
      search = "",
      page = 1,
      limit = 10,
      orderBy = "createdAt",
      order = "DESC",
    } = req.query;

    const result = await purchaseService.getAll({
      search,
      page: Number(page),
      limit: Number(limit),
      orderBy,
      order,
      searchFields: ["reference"], // Add more fields if needed
      include: [{ model: PurchaseItem }],
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===============================
// GET PURCHASE BY ID
// ===============================
const getPurchaseById = async (req, res) => {
  try {
    const purchase = await Purchase.findByPk(req.params.id, {
      include: [{ model: PurchaseItem }],
    });

    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    res.status(200).json(purchase);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===============================
// UPDATE PURCHASE
// ===============================
const updatePurchase = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { id } = req.params;
    const {
      supplier_id,
      reference,
      date,
      order_tax,
      discount,
      shipping,
      status,
      description,
      items,
    } = req.body;

    const updated_by = req.user?.id || "system";

    const purchase = await Purchase.findByPk(id);
    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    // Recalculate total cost
    let totalCost = 0;
    items.forEach((p) => {
      const unitPrice = p.price - p.discount + p.tax_amount;
      totalCost += unitPrice * p.qty;
    });

    // Update purchase
    await purchase.update(
      {
        supplier_id,
        reference,
        date,
        order_tax,
        discount,
        shipping,
        status,
        description,
        total_cost: totalCost,
        updated_by,
      },
      { transaction: t }
    );

    // Remove old items
    await PurchaseItem.destroy(
      { where: { purchase_id: id } },
      { transaction: t }
    );

    // Insert new items
    for (const p of items) {
      const unitPrice = p.price - p.discount + p.tax_amount;

      await PurchaseItem.create(
        {
          purchase_id: id,
          product_id: p.product_id,
          qty: p.qty,
          price: p.price,
          discount: p.discount,
          tax_percent: p.tax_percent,
          tax_amount: p.tax_amount,
          unit_price: unitPrice,
          total_cost: unitPrice * p.qty,
          updated_by,
        },
        { transaction: t }
      );
    }

    await t.commit();
    res.json({ message: "Purchase updated successfully" });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ message: err.message });
  }
};

// ===============================
// DELETE PURCHASE (via BaseService)
// ===============================
const deletePurchase = async (req, res) => {
  try {
    const response = await purchaseService.delete(req.params.id);
    res.json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===============================
// RESTORE PURCHASE
// ===============================
const restorePurchase = async (req, res) => {
  try {
    await Purchase.restore({ where: { id: req.params.id } });
    res.json({ message: "Purchase restored successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default {
  createPurchase,
  getAllPurchases,
  getPurchaseById,
  updatePurchase,
  deletePurchase,
  restorePurchase,
};
























