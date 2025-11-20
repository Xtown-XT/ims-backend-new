import warehouse from "../models/warehouse.models.js";
import BaseService from "../../../services/service.js";

const warehouseService = new BaseService(warehouse);

// create warehouse

export const createwarehouse = async (req, res)=>{

    try{
        const data = req.body;
        const warehouse = await warehouseService.create(data);
        res.status(201).json({message:"warehouse created sucessfully",data:warehouse});
    }
    catch(error){
        res.status(400).json({message:error.message});
    }

        
    };

    // get all warehouse

    export const getAllwarehouse = async (req,res)=>{
//  try {
//     const {
//       search = "",
//       page = 1,
//       limit = 10,
//       orderBy = "createdAt",
//       order = "ASC"
//     } = req.query;

//     // 🔥 Convert to proper types
//     const pageNumber = Number(page);
//     const limitNumber = Number(limit);

//     // 🔍 Validate order direction
//     const sortOrder = ["ASC", "DESC"].includes(order.toUpperCase())
//       ? order.toUpperCase()
//       : "ASC";

//     // 🔐 Only allow safe columns to be used for sorting
//     const allowedOrderBy = ["createdAt", "updatedAt", "warehouse_name", "city", "state", "country"];
//     const sortField = allowedOrderBy.includes(orderBy) ? orderBy : "createdAt";

//     const result = await warehouseService.getAll({
//       search,
//       page: pageNumber,
//       limit: limitNumber,
//       orderBy: sortField,
//       order: sortOrder,
//       searchFields: ["warehouse_name", "city", "state", "country"],
//     });

//     res.status(200).json({
//       message: "Warehouses fetched successfully",
//       data: result,
//     });

//   } catch (error) {
//     console.error("Error fetching warehouses:", error);
//     res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// };


try {
    const {
      search = "",
      page = 1,
      limit = 10,
      orderBy = "createdAt",
      order = "ASC"
    } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const sortOrder = ["ASC", "DESC"].includes(order.toUpperCase())
      ? order.toUpperCase()
      : "ASC";

    const allowedOrderBy = [
      "createdAt",
      "updatedAt",
      "warehouse_name",
      "city",
      "state",
      "country",
    ];

    const sortField = allowedOrderBy.includes(orderBy) ? orderBy : "createdAt";

    const result = await warehouseService.getAll({
      search,
      page: pageNumber,
      limit: limitNumber,
      orderBy: sortField,
      order: sortOrder,
      searchFields: ["warehouse_name", "city", "state", "country"],
      paranoid: false, // ❗ Prevent deletedAt from being used
    });

    return res.status(200).json({
      message: "Warehouses fetched successfully",
      data: result,
    });

  } catch (error) {
    console.error("Error fetching warehouses:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// get warehouse by id

export const getwarehouseByid = async (req,res)=>{
    try{
        const {id} = req.params;
        const warehouse = await warehouseService.getById(id);
        res.status(200).json({message:"warehouse fetched successfully",data:warehouse});
    }
    catch(error){
        res.status(400).json({message:error.message});
    }
}

// delte warehouse 

export const deletewarehouse = async(req,res)=>{
   try {
    const { id } = req.params; 

    const warehouseData = await warehouseService.delete(id); 

    res.status(200).json({
      message: "Warehouse deleted successfully",
      data: warehouseData,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || "Failed to delete warehouse",
    });
  }
};

// update warehouse

export const updatewarehouse = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updated = await warehouseService.update(id, data);
    res.status(200).json({ message: "warehouse updated successfully", data: updated });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



    


