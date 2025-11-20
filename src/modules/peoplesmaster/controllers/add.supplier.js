import Supplier from "../models/addsuppiler.models.js";
import BaseService from "../../../services/service.js";

const supplierService = new BaseService(Supplier);

export const createsupplier = async (req, res) => {
  try {
    let {
      first_name,
      last_name,
      email,
      phone,
      address,
      city,
      state,
      country,
      postal_code,
    } = req.body;

    if (!first_name || !email || !phone) {
      return res.status(400).json({
        message: "First name, email & phone are required",
      });
    }

    // normalize email
    email = email.trim().toLowerCase();

    // Check duplicate email
    const existing = await Supplier.findOne({
      where: { email },
      paranoid: false,
    });

    if (existing) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    // Handle uploaded image
    const imageFile = req.file ? req.file.filename : null;

    const payload = {
      first_name,
      last_name,
      email,
      phone,
      address,
      city,
      state,
      country,
      postal_code,
      image: imageFile,
      created_by: req.user?.id || "system",
    };

    // Create Supplier
    const createdSupplier = await supplierService.create(payload);

    // Auto-generate image URL
    const BASE_URL = `${req.protocol}://${req.get("host")}`;

    return res.status(201).json({
      message: "Supplier created successfully",
      data: {
        ...createdSupplier.dataValues,
        image: createdSupplier.image
          ? `${BASE_URL}/uploads/suppliers/${createdSupplier.image}`
          : null,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create supplier",
      error: error.message,
    });
  }
};

// get all customers
export const getAllSuppliers = async (req, res) => {
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

    const allowedOrderBy = [
      "createdAt",
      "updatedAt",
      "first_name",
      "email",
      "phone",
      "city",
      "state",
      "country",
    ];

    const sortField = allowedOrderBy.includes(orderBy)
      ? orderBy
      : "createdAt";

    const sortOrder = ["ASC", "DESC"].includes(order.toUpperCase())
      ? order.toUpperCase()
      : "ASC";

    // Fetch data from BaseService
    const result = await supplierService.getAll({
      search,
      page: pageNumber,
      limit: limitNumber,
      orderBy: sortField,
      order: sortOrder,
      searchFields: [
        "first_name",
        "last_name",
        "email",
        "phone",
        "city",
        "state",
        "country",
      ],
      paranoid: false, // include soft-deleted
    });

    const BASE_URL = `${req.protocol}://${req.get("host")}`;

    // Add full image URL
    const suppliersWithImage = result.rows.map((supplier) => {
      return {
        ...supplier.dataValues,
        image: supplier.image
          ? `${BASE_URL}/uploads/suppliers/${supplier.image}`
          : null,
      };
    });

    return res.status(200).json({
      message: "Suppliers fetched successfully",
      data: {
        total: result.count,
        page: pageNumber,
        limit: limitNumber,
        suppliers: suppliersWithImage,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch suppliers",
      error: error.message,
    });
  }
};

export const updateSupplierById = async (req, res) => {
  try {
    const { id } = req.params;

    // 1️⃣ Check supplier exists (include soft deleted)
    const supplier = await Supplier.findOne({
      where: { id },
      paranoid: false,
    });

    if (!supplier) {
      return res.status(404).json({
        message: "Supplier not found",
      });
    }

    // 2️⃣ Extract request body
    let {
      first_name,
      last_name,
      email,
      phone,
      address,
      city,
      state,
      country,
      postal_code,
    } = req.body;

    // 3️⃣ Normalize & check duplicate email
    if (email) {
      email = email.trim().toLowerCase();

      const existing = await Supplier.findOne({
        where: { email },
        paranoid: false,
      });

      if (existing && existing.id !== id) {
        return res.status(409).json({
          message: "Email already exists for another supplier",
        });
      }
    }

    // 4️⃣ Handle image upload
    const imageFile = req.file ? req.file.filename : supplier.image;

    // 5️⃣ Build update payload
    const payload = {
      first_name,
      last_name,
      email,
      phone,
      address,
      city,
      state,
      country,
      postal_code,
      image: imageFile,
      updated_by: req.user?.id || "system",
    };

    // Remove undefined values
    Object.keys(payload).forEach(
      (key) => payload[key] === undefined && delete payload[key]
    );

    // 6️⃣ Update supplier
    await supplier.update(payload);

    const BASE_URL = `${req.protocol}://${req.get("host")}`;

    // 7️⃣ Send response
    return res.status(200).json({
      message: "Supplier updated successfully",
      data: {
        ...supplier.dataValues,
        image: supplier.image
          ? `${BASE_URL}/uploads/suppliers/${supplier.image}`
          : null,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update supplier",
      error: error.message,
    });
  }
};
export const getSupplierById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find supplier (include soft deleted)
    const supplier = await Supplier.findOne({
      where: { id },
      paranoid: false,
    });

    if (!supplier) {
      return res.status(404).json({
        message: "Supplier not found",
      });
    }

    // Auto-generate Base URL
    const BASE_URL = `${req.protocol}://${req.get("host")}`;

    // Add full image url
    const supplierData = {
      ...supplier.dataValues,
      image: supplier.image
        ? `${BASE_URL}/uploads/suppliers/${supplier.image}`
        : null,
    };

    return res.status(200).json({
      message: "Supplier fetched successfully",
      data: supplierData,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch supplier",
      error: error.message,
    });
  }
};

export const deleteSupplierById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check record exists (include soft-deleted)
    const supplier = await Supplier.findOne({
      where: { id },
      paranoid: false,
    });

    if (!supplier) {
      return res.status(404).json({
        message: "Supplier not found",
      });
    }

    // Soft delete (Sequelize will set deletedAt automatically)
    await Supplier.destroy({
      where: { id },
    });

    return res.status(200).json({
      message: "Supplier deleted successfully",
      deletedId: id,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete supplier",
      error: error.message,
    });
  }
};


export default {
 createsupplier ,
 getAllSuppliers ,
 updateSupplierById,
  getSupplierById ,
  deleteSupplierById 

  
};