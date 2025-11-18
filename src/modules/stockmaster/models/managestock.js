import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";

const Managestock = sequelize.define(
    "Managestock",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
       warehouse:{
        type: DataTypes.STRING,
        allowNull: false,
       },
       store:{
        type: DataTypes.STRING,
        allowNull: false,
       },
       product:{
        type: DataTypes.STRING,
        allowNull: false,
       },
       Responsible_Person:{
        type: DataTypes.STRING,
        allowNull: false,
       },
       quantity:{
        type: DataTypes.INTEGER,
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
        tablename: "managestock",
        paraniod: true,
     
    }
);

export default Managestock;