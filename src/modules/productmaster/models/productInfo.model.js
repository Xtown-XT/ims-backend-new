import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";

const ProductInfo = sequelize.define("ProductInfo", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },

  store_id: { type: DataTypes.UUID, allowNull: false,
      references: {
        model: "store",
        key: "id",
      },
   },
  warehouse_id: { type: DataTypes.UUID, allowNull: false,
      references: {
        model: "warehouse",
        key: "id",
      },
   },

  product_name: { type: DataTypes.STRING, allowNull: false   },
  slug: { type: DataTypes.STRING, allowNull: false, unique: true },

  sku: { type: DataTypes.STRING, allowNull: true, unique: true },

  category_id: { type: DataTypes.UUID, allowNull: false,
      references: {
        model: "categories",
        key: "id",
      },
   },
  subcategory_id: {
  type: DataTypes.UUID,
  allowNull: false,
  references: {
    model: "subcategories",
    key: "id",
  }
},

  brand_id: { type: DataTypes.UUID, allowNull: false,
      references: {
        model: "brands",
        key: "id",
      },
   },
  unit_id: { type: DataTypes.UUID, allowNull: false,
      references: {
        model: "units",
        key: "id",
      },
   },

  barcode_symbology_id: { type: DataTypes.UUID, allowNull: true ,
      references: {
        model: "barcodes",
        key: "id",
      },
  },

  selling_type: {
    type: DataTypes.ENUM("online", "pos"),
    allowNull: false,
  },

  description: { type: DataTypes.TEXT, allowNull: true },
   is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
},{
   tableName: "productInfo",
    timestamps: true,
    paranoid: true,
});

export default ProductInfo;
