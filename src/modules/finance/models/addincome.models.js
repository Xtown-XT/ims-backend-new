import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";

const Income = sequelize.define({
    "Income":{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        



    }
})