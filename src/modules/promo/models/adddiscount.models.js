// import DataTypes from "sequelize";
// import { sequelize } from "../../../db/index.js";
// const Discount = sequelize.define(
//   "Discount",
//   {
//     id: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       primaryKey: true,
//       allowNull: false,
//     },

//      discount_plan_id: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       references: {
//         model: "discount_plans", // ✅ MUST MATCH EXACT TABLE NAME
//         key: "id",
//       },
    
//     },
//     discount_plan: {
//       type: DataTypes.ENUM(
//         "standard",
//         "membership",
//         "seasonal",
//         "festival",
//         "special_offer"
//       ),
//       allowNull: false,
//     },

//     applicable_for: {
//       type: DataTypes.ENUM(
//         "all_customers",
//         "members_only",
//         "high_spending_customers",
//         "custom_selected"
//       ),
//       allowNull: false,
//     },

//     valid_from: {
//       type: DataTypes.DATEONLY,
//       allowNull: false,
//     },

//     valid_till: {
//       type: DataTypes.DATEONLY,
//       allowNull: false,
//     },

//     discount_type: {
//       type: DataTypes.ENUM(
//         "percentage",
//         "flat"
//       ),
//       allowNull: false,
//     },

// valid_days: {
//   type: DataTypes.JSON, 
//   allowNull: false,
// },


//     status: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//       defaultValue: true,
//     }
//   },
//   {
//     tableName: "discounts",
//     timestamps: true,
//     paranoid: true, 
//   }
// );

// export default Discount;


// src/modules/promo/models/discount.model.js
import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";

const Discount = sequelize.define(
  "Discount",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    discount_plan_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "discount_plans",   // ✅ MUST MATCH TABLE NAME EXACTLY
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },

    discount_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    discount_plan: {
      type: DataTypes.ENUM(
        "standard",
        "membership",
        "seasonal",
        "festival",
        "special_offer"
      ),
      allowNull: false,
    },

    applicable_for: {
      type: DataTypes.ENUM(
        "all_products",
        "specific_products",
      ),
      allowNull: false,
    },

    valid_from: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    valid_till: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    discount_type: {
      type: DataTypes.ENUM("percentage", "flat"),
      allowNull: false,
    },

    valid_days: {
      type: DataTypes.JSON,
      allowNull: false,
    },

    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  {
    tableName: "discounts",
    timestamps: true,
    paranoid: true,
  }
);

export default Discount;

