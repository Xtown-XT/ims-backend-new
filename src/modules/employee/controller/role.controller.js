import Role from "../models/role.model.js";
import BaseService from "../../../services/service.js";

const roleService = new BaseService(Role);

// ✅ POST /api/role/createRole
export const createRole = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      created_by: req.user?.id || "system",
    };

    const newRole = await roleService.create(payload);

    return res.status(201).json({
      message: "Role created successfully",
      data: newRole,
    });
  } catch (error) {
    console.error("❌ Error in createRole:", error);
    return res.status(500).json({
      message: "Failed to create role",
      error: error.message,
    });
  }
};

// ✅ GET /api/role/getAllRoles
export const getAllRoles = async (req, res) => {
  try {
    const options = {
      includeInactive: req.query.includeInactive === "true" || false,
      search: req.query.search || "",
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
      orderBy: req.query.orderBy || "createdAt",
      order: req.query.order || "ASC",
      searchFields: ["role_name", "description"],
    };

    const result = await roleService.getAll(options);

    return res.status(200).json({
      message: "Roles fetched successfully",
      ...result,
    });
  } catch (error) {
    console.error("❌ Error in getAllRoles:", error);
    return res.status(500).json({
      message: "Failed to fetch roles",
      error: error.message,
    });
  }
};

// ✅ GET /api/role/getRoleById/:id
export const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await roleService.getById(id);

    return res.status(200).json({
      message: "Role fetched successfully",
      data: role,
    });
  } catch (error) {
    console.error("❌ Error in getRoleById:", error);
    return res.status(500).json({
      message: "Failed to fetch role",
      error: error.message,
    });
  }
};

// ✅ PUT /api/role/updateRole/:id
export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = {
      ...req.body,
      updated_by: req.user?.id || "system",
    };

    const updatedRole = await roleService.update(id, payload);

    return res.status(200).json({
      message: "Role updated successfully",
      data: updatedRole,
    });
  } catch (error) {
    console.error("❌ Error in updateRole:", error);
    return res.status(500).json({
      message: "Failed to update role",
      error: error.message,
    });
  }
};

// ✅ DELETE /api/role/deleteRole/:id
export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await roleService.delete(id);

    return res.status(200).json({
      message: "Role deleted successfully",
      data: result,
    });
  } catch (error) {
    console.error("❌ Error in deleteRole:", error);
    return res.status(500).json({
      message: "Failed to delete role",
      error: error.message,
    });
  }
};

// ✅ PUT /api/role/restoreRole/:id
export const restoreRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findOne({
      where: { id },
      paranoid: false, // include soft-deleted
    });

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    await role.restore();
    await role.update({ is_active: true });

    return res.status(200).json({
      message: "Role restored successfully",
      data: role,
    });
  } catch (error) {
    console.error("❌ Error in restoreRole:", error);
    return res.status(500).json({
      message: "Failed to restore role",
      error: error.message,
    });
  }
};

export default {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
  restoreRole,
};
