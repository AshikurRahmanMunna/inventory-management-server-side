const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require('validator');

const productSchema = mongoose.Schema(
  {
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
    imageURLs: [{
      type: String,
      required: true,
      validate: {
        validator: (value) => {
          if(!Array.isArray(value)){
            return false;
          }
          let isValid = true;
          value.forEach(url => {
            if(!validator.isURL(url)){
              isValid =  false;
            }
          });
          return isValid;
        },
        message: "Please provide valid image urls"
      }
    }],

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

productSchema.methods.logger = function () {
  console.log(`Data saved for ${this.name}`);
};

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
