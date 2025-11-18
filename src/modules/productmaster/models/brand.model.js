import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";

const Brand = sequelize.define(
    "Brand",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        image: {
         type: DataTypes.STRING,
         allowNull: true,
       },
        brand_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
     created_by: {
  type: DataTypes.STRING, 
  allowNull: true,          
},
        updated_by: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        tableName: "brands",
        timestamps: true,
        paraniod: true,

    }
);

export default Brand;