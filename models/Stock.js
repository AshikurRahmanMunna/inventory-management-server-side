const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const stockSchema = mongoose.Schema(
  {
    productId: {
      type: ObjectId,
      required: true,
      ref: "Product",
    },
    name: {
      type: String,
      required: [true, "Please provide a name for this product"],
      trim: true,
      unique: [true, "Name must be unique"],
      lowercase: true,
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [100, "Name is too large"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["ton", "kg", "gram", "bag", "litre", "pcs", "box", "cartoon"],
        message:
          "unit value can't be {VALUE}, must be ton/kg/gram/bag/litre/pcs/box or cartoon",
      },
    },
    imageURLs: {
      type: String,
      validate: {
        validate: (value) => {
          if (!Array.isArray(value)) {
            return false;
          }
          let isValid = true;
          value.forEach((url) => {
            if (!validator.irURL(url)) {
              isValid = false;
            }
          });
          return isValid;
        },
        message: "Please Provide Valid Image URLs",
      },
    },

    price: {
      type: Number,
      required: true,
      min: [0, "Price can't be negative"],
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity can't be negative"],
    },
    category: {
      type: String,
      required: true,
      id: {
        type: ObjectId,
        ref: "Category",
      },
    },
    brand: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: "Brand",
      },
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "Status can't be {VALUE}",
      },
    },
    store: {
      name: {
        type: String,
        required: [true, "Please provide a name for this product"],
        trim: true,
        unique: [true, "Name must be unique"],
        lowercase: true,
        minLength: [3, "Name must be at least 3 characters"],
        maxLength: [100, "Name is too large"],
      },
      id: {
        type: ObjectId,
        required: true,
        ref: "Store",
      },
    },
    suppliedBy: {
      name: {
        type: String,
        required: [true, "Please provide a supplier name product"],
        trim: true,
      },
      id: {
        type: ObjectId,
        required: true,
        ref: "Supplier",
      },
    },
  },
  { timestamps: true }
);

// productSchema.pre("save", function (next) {
//   console.log("Before Saving Data");
//   if (this.quantity == 0) {
//     this.status = "out-of-stock";
//   }
//   next();
// });

stockSchema.methods.logger = function () {
  console.log(`Data saved for ${this.name}`);
};

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
