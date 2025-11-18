import BaseService from "../../../services/service";
import ProductModel from "../model/product.model.js";

const productService = new BaseService(ProductModel);

export const createProduct = async (req, res) => {
  try {
    const productData = req.body;
    const newProduct = await productService.create(productData);
    return res.status(201).json({
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({
      message: "Failed to create product",
      error: error.message,
    });
  }
};
export const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAll();
    return res.status(200).json(products);
    } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getById(id);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(404).json({ message: "Product not found" });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await productService.update(id, req
.body);
    return res.status(200).json({
      message: "Product updated successfully",
      data: updatedProduct,
    });
  }
    catch (error) {
    return res.status(500).json({
        message: "Failed to update product",
        error: error.message,
    });
    }
};
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productService.delete(id);
    return res.status(200).json({
        message: "Product deleted successfully", 
    });
    } catch (error) {
    return res.status(500).json({
        message: "Failed to delete product",
        error: error.message,
    });
    }
};
    export default
{ createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
