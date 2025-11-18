import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";

const Stockadjustment = sequelize.define(
    "Stockadjustment",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
       product: {
        type: DataTypes.STRING,
        allowNull: false,
       },
       warehouse: {
        type: DataTypes.STRING,
        allowNull: false,
       },
       reference_number: {
        type: DataTypes.STRING,
        allowNull: false,   
       },
       store:{
        type: DataTypes.STRING,
        allowNull: false,
       },
       responsible_person:{
        type: DataTypes.STRING,
        allowNull: false,
       },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true,
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
        tableName: "stockadjustment",
        timestamps: true,
        paranoid: true
    }
);

export default Stockadjustment;