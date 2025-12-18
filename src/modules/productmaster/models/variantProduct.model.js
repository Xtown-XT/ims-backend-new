// import { DataTypes } from "sequelize";
// import { sequelize } from "../../../db/index.js";

// const VariantProduct = sequelize.define(
//   "VariantProduct",
//   {
//     id: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       primaryKey: true,
//     },

//     product_id: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       references: {
//         model: "productInfo",
//         key: "id",
//       },
//     },

//     attribute_name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       references: {
//         model: "variants",
//         key: "variant_name",
//       },
//     },

//     attribute_value: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       references: {
//         model: "variants",
//         key: "values",
//       },
//     },

//     sku: { type: DataTypes.STRING, allowNull: false, unique: true },

//     /* --------------------------
//        NEW FIELDS FOR VARIANT UI
//        -------------------------- */

//     barcode_symbology_id: { type: DataTypes.UUID, allowNull: false ,
//       references: {
//         model: "barcodes",
//         key: "id",
//       },
//   },

//     quantity: { type: DataTypes.INTEGER, allowNull: false },
//   quantity_alert: { type: DataTypes.INTEGER, allowNull: false },

//   price: { type: DataTypes.FLOAT, allowNull: false },

//   tax_id: { type: DataTypes.UUID, allowNull: false ,
//      references: {
//         model: "taxes",
//         key: "id",
//       },
//   },
//   tax_type: {
//     type: DataTypes.ENUM("inclusive", "exclusive"),
//     allowNull: false,
//   },

//   discount_type: {
//     type: DataTypes.ENUM("percentage", "fixed"),
//     allowNull: false,
//   },
//   discount_value: { type: DataTypes.FLOAT, allowNull: false },
  
//     is_active: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: true,
//     },

//     created_by: DataTypes.UUID,
//     updated_by: DataTypes.UUID,
//   },
//   {
//     tableName: "variantProduct",
//     timestamps: true,
//     paranoid: true,
//   }
// );

// export default VariantProduct;


// VariantProduct model
import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";

const VariantProduct = sequelize.define(
  "VariantProduct",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "productInfo",
        key: "id",
      },
    },

    attribute_name: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "variants",
        key: "variant_name",
      },
    },

    attribute_value: {
      type: DataTypes.STRING, // Must match Variant.variant_value
      allowNull: false,
      references: {
        model: "variants",
        key: "variant_value",
      },
    },

    sku: { type: DataTypes.STRING, allowNull: false, unique: true },

    barcode_symbology_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "barcodes",
        key: "id",
      },
    },

    quantity: { type: DataTypes.INTEGER, allowNull: false },
    quantity_alert: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },

    tax_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "taxes",
        key: "id",
      },
    },
    tax_type: {
      type: DataTypes.ENUM("inclusive", "exclusive"),
      allowNull: false,
    },

    discount_type: {
      type: DataTypes.ENUM("percentage", "fixed"),
      allowNull: false,
    },
    discount_value: { type: DataTypes.FLOAT, allowNull: false },

    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },

    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
  },
  {
    tableName: "variantProduct",
    timestamps: true,
    paranoid: true,
  }
);

export default VariantProduct;
