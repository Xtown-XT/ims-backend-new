import Store from "../models/store.model.js";

const storeController = {
  // 🔹 Create
  async createStore(req, res) {
    try {
      const store = await Store.create(req.body);
      res.status(201).json(store);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // 🔹 Get All
  async getAllStores(req, res) {
    try {
      const stores = await Store.findAll();
      res.json(stores);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // 🔹 Get by ID
  async getStoreById(req, res) {
    try {
      const store = await Store.findByPk(req.params.id);
      if (!store) return res.status(404).json({ message: "Store not found" });
      res.json(store);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // 🔹 Update
  async updateStore(req, res) {
    try {
      const store = await Store.findByPk(req.params.id);
      if (!store) return res.status(404).json({ message: "Store not found" });
      await store.update(req.body);
      res.json(store);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // 🔹 Delete
  async deleteStore(req, res) {
    try {
      const store = await Store.findByPk(req.params.id);
      if (!store) return res.status(404).json({ message: "Store not found" });
      await store.destroy();
      res.json({ message: "Store deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default storeController;
