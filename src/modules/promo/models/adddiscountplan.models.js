// import DataTypes from "sequelize";
// import { sequelize } from "../../../db/index.js";

// const Discountadd = sequelize.define(
//     "DiscountPlan",
//     {
//         id: {
//             type: DataTypes.UUID,
//             defaultValue: DataTypes.UUIDV4,
//             primaryKey: true,
//             allowNull: false,
//         },
//         plan_name:{
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         customer:{
//             type: DataTypes.ENUM(
//         "all_customers",
//         "members_only",
//         "high_spending_customers",
//         "custom_selected",
        
//       ),  
//        allowNull: false, 
        

//     },
//     status:{
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//         defaultValue: true,
//     },
//     },
//       {
//     tableName: "discountPlans",
//     timestamps: true,   // createdAt + updatedAt
//     paranoid: true,     // deletedAt for soft delete
//   }
// );

// export default Discountadd;

// src/modules/promo/models/discountPlan.model.js
import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";

const DiscountPlan = sequelize.define(
  "DiscountPlan",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    plan_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    customer: {
      type: DataTypes.ENUM(
        "all_customers",
        "members_only",
        "high_spending_customers",
        "custom_selected"
      ),
      allowNull: false,
    },

    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  {
    tableName: "discount_plans",   // ✅ FIXED NAME
    timestamps: true,
    paranoid: true,
  }
);

export default DiscountPlan;
