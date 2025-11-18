import BaseService from "../../../services/service.js";
import Unit from "../models/unit.model.js";

const unitService = new BaseService(Unit);

class UnitController {
  // ✅ Create
  async createUnit(req, res) {
    try {
      const data = req.body;
      const unit = await unitService.create(data);
      res.status(201).json({ message: "Unit created successfully", data: unit });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // ✅ Get All
  async getAllUnits(req, res) {
    try {
      const { search, page, limit, orderBy, order } = req.query;
      const units = await unitService.getAll({
        search,
        page,
        limit,
        orderBy,
        order,
        searchFields: ["unit_name", "short_name"],
      });
      res.status(200).json({ message: "Units fetched successfully", data: units });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // ✅ Get by ID
  async getUnitById(req, res) {
    try {
      const { id } = req.params;
      const unit = await unitService.getById(id);
      res.status(200).json({ message: "Unit fetched successfully", data: unit });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  // ✅ Update
  async updateUnit(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updated = await unitService.update(id, data);
      res.status(200).json({ message: "Unit updated successfully", data: updated });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // ✅ Delete
  async deleteUnit(req, res) {
    try {
      const { id } = req.params;
      const result = await unitService.delete(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new UnitController();
