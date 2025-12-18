import Variant from "../models/variant.models.js"
import BaseService from "../../../services/service.js";

const variantService = new BaseService(Variant);


// Create Variant
export const createVariant = async (req, res) => {
  try {
    const { variant_name, variant_value, status } = req.body;

    if (!variant_name || !variant_value) {
      return res.status(400).json({
        status: "error",
        message: "variant_name and values are required",
      });
    }

    const newVariant = await variantService.create({
      variant_name,
      variant_value,
      status,
    });

    return res.status(201).json({
      status: "success",
      message: "Variant created successfully",
      data: newVariant,
    });
  } catch (error) {
    console.error("❌ Error creating variant:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// export const createVariant = async (req, res) => {
//   try {
//     const { variant_name, variant_value, status } = req.body;

//     if (!variant_name || !variant_value) {
//       return res.status(400).json({
//         status: "error",
//         message: "variant_name and variant_value are required",
//       });
//     }

//     // Convert input to array
//     const valuesArray = Array.isArray(variant_value)
//       ? variant_value
//       : variant_value.split(",").map(v => v.trim());

//     // Create multiple rows
//     const rows = await Promise.all(
//       valuesArray.map(value =>
//         Variant.create({
//           variant_name,
//           variant_value: value,
//           status: status ?? true,
//         })
//       )
//     );

//     return res.status(201).json({
//       status: "success",
//       message: "Variants created successfully",
//       data: rows,
//     });

//   } catch (error) {
//     console.error("❌ Error creating variant:", error);
//     return res.status(500).json({
//       status: "error",
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// };


//  get all variant
export const getAllvariants = async (req,res)=>{
    try {
    const { page, limit, search } = req.query;

    // ✅ Convert to numbers properly
    const variants = await variantService.getAll({
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      search: search || "",
      orderBy: "created_at", // ✅ matches BaseService default naming
      order: "DESC",
      searchFields: ["variant_name", "variant_value"],
    });

    return res.status(200).json({
      status: "success",
      message: "Variants fetched successfully",
      data: variants,
    });
  } catch (error) {
    console.error("❌ Error fetching variants:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};   

// // update  varient by id 

export const updatevariant = async(req,res)=>{
  try {
    const {id}=req.params;
    const {variant_name,values,status}=req.body;

    const updatadVaraint=await variantService.update(id,{ variant_name, values, status });

    return res.status(200).json({
      message:"varriant updated successfully",
      data:updatadVaraint,

    });
  } catch (error) {
    console.error(" Error updating variant:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

// export const updatevariant = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { variant_name, variant_value, status } = req.body;

//     // Find row by ID
//     const variant = await Variant.findByPk(id);

//     if (!variant) {
//       return res.status(404).json({
//         message: "Variant not found",
//       });
//     }

//     // Update row
//     await variant.update({
//       variant_name: variant_name ?? variant.variant_name,
//       variant_value: variant_value ?? variant.variant_value,
//       status: status ?? variant.status,
//     });

//     return res.status(200).json({
//       message: "Variant updated successfully",
//       data: variant,
//     });

//   } catch (error) {
//     console.error("❌ Error updating variant:", error);
//     return res.status(500).json({
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// };


// getsingle id

export const getvariantById = async(req,res)=>{
  try{
    const {id}=req.params;
    const variant=await variantService.getById(id);

    return res.status(200).json({
      message:"varaint fetched by single id",
      data:variant,

    });
  }
  catch(error){
    console.error("❌ Error fetching variant by id:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

export const deleteVariant = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedVariant = await variantService.delete(id);

    // If variant not found → return 404
    if (!deletedVariant) {
      return res.status(404).json({
        status: "error",
        message: "Variant not found"
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Variant deleted successfully"
    });

  } catch (error) {
    console.error("❌ Error deleting variant:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message
    });
  }
};