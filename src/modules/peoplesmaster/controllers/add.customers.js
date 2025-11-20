import  Customer  from "../models/addcustomers.models.js";
import BaseService from "../../../services/service.js";

const customerService = new BaseService( Customer );




export const customercreate = async (req, res) => {
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
        message: "First name, email & phone are required.",
      });
    }

    // normalize email
    email = email.trim().toLowerCase();

    // Check duplicate email (with soft-deleted)
    const existing = await Customer.findOne({
      where: { email },
      paranoid: false,
    });

    if (existing) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

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

    const createdCustomer = await customerService.create(payload);

    // 👇 Auto-generate URL
    const BASE_URL = `${req.protocol}://${req.get("host")}`;

    return res.status(201).json({
      message: "Customer created successfully",
      data: {
        ...createdCustomer.dataValues,
        image: createdCustomer.image
          ? `${BASE_URL}/uploads/customers/${createdCustomer.image}`
          : null,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create customer",
      error: error.message,
    });
  }
};
// get all customers
export const getAllCustomers = async (req, res) => {
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
    const result = await customerService.getAll({
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
      paranoid: false, // include soft deleted
    });

    const BASE_URL = `${req.protocol}://${req.get("host")}`;

    // Add full image URL
    const customersWithImage = result.rows.map((customer) => {
      return {
        ...customer.dataValues,
        image: customer.image
          ? `${BASE_URL}/uploads/customers/${customer.image}`
          : null,
      };
    });

    return res.status(200).json({
      message: "Customers fetched successfully",
      data: {
        total: result.count,
        page: pageNumber,
        limit: limitNumber,
        customers: customersWithImage,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch customers",
      error: error.message,
    });
  }
};


export const updateCustomerById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check customer exists (also check soft-deleted)
    const customer = await Customer.findOne({
      where: { id },
      paranoid: false,
    });

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

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

    // Normalize email if provided
    if (email) {
      email = email.trim().toLowerCase();

      // Duplicate email check
      const existing = await Customer.findOne({
        where: { email },
        paranoid: false,
      });

      if (existing && existing.id !== id) {
        return res.status(409).json({
          message: "Email already exists for another customer",
        });
      }
    }

    // Handle new uploaded image
    const imageFile = req.file ? req.file.filename : customer.image;

    // Update payload
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

    // Remove undefined fields
    Object.keys(payload).forEach(
      (key) => payload[key] === undefined && delete payload[key]
    );

    // Update customer
    await customer.update(payload);

    // Auto full image URL
    const BASE_URL = `${req.protocol}://${req.get("host")}`;

    return res.status(200).json({
      message: "Customer updated successfully",
      data: {
        ...customer.dataValues,
        image: customer.image
          ? `${BASE_URL}/uploads/customers/${customer.image}`
          : null,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update customer",
      error: error.message,
    });
  }
};

export const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find customer (include soft deleted also)
    const customer = await Customer.findOne({
      where: { id },
      paranoid: false,
    });

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    // Generate Base URL (auto)
    const BASE_URL = `${req.protocol}://${req.get("host")}`;

    // Add full image URL
    const customerData = {
      ...customer.dataValues,
      image: customer.image
        ? `${BASE_URL}/uploads/customers/${customer.image}`
        : null,
    };

    return res.status(200).json({
      message: "Customer fetched successfully",
      data: customerData,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch customer",
      error: error.message,
    });
  }
};

export const deleteCustomerById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check Record Exists Before Delete
    const customer = await Customer.findOne({
      where: { id },
      paranoid: false,  // include soft-deleted also
    });

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    // Perform soft delete (Sequelize will set deletedAt)
    await Customer.destroy({
      where: { id }
    });

    return res.status(200).json({
      message: "Customer deleted successfully",
      deletedId: id,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete customer",
      error: error.message,
    });
  }
};
export default {
  customercreate,
  getAllCustomers,
  updateCustomerById ,
  getCustomerById,
  deleteCustomerById

  
};