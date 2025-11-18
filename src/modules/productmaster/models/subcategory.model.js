import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";

const Subcategory = sequelize.define(
  "Subcategory",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    subcategory_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    category_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "categories", // correct reference
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },

    category_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
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
      allowNull: true,
    },
  },
  {
    tableName: "subcategories",
    timestamps: true,
    paranoid: true, // fixed spelling
     deletedAt: "deleted_at", // 👈 matches DB
  }
);



export default Subcategory;
