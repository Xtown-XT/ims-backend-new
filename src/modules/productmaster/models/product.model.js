import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";
import { ca } from "zod/v4/locales";

const Products = sequelize.define(
  "Products",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.UUID,
      allowNull: false,
        references: {
        model: "categories",
        key: "id",
      },
    },
    product_name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
    },
    unit:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    stock_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    reorder_level: {
        type: DataTypes.INTEGER,
        allowNull: false,   
        defaultValue: 0,
    },
    qr_code: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    },
    created_by: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    updated_by: {
        type: DataTypes.UUID,
        allowNull:true,
    },
    },
    {
    tableName: "products",
    timestamps: false, 
    paranoid :true
    }
);

export default Products;

