import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";

const Stocktransfer = sequelize.define(
    "Stocktransfer",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        warehouse_from: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        warehouse_to: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        reference_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
       no_of_products:{
        type: DataTypes.STRING,
        allowNull: false,
       },
       quatity_transferred:{
        type: DataTypes.STRING,
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
        timestamps: true,
        tableName: "stocktransfer",
        paranoid:true
    }
);

export default Stocktransfer;
        