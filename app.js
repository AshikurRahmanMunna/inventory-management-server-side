const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// middleware
app.use(express.json());
app.use(cors());

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this product"],
      trim: true,
      unique: [true, "Name must be unique"],
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [100, "Name is too large"],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
      min: [0, "Price can't be negative"],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["ton", "kg", "litre", "pcs", "box", "cartoon"],
        message:
          "unit value can't be {VALUE}, must be ton/kg/litre/pcs/box or cartoon",
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity can't be negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
        message: "quantity must be an integer",
      },
    },
    status: {
      type: String,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "status can't be {VALUE}",
      },
      required: true,
    },
    // supplier: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Supplier",
    // },
    // categories: [
    //   {
    //     name: {
    //       type: String,
    //       required: true,
    //     },
    //     _id: mongoose.Schema.Types.ObjectId,
    //   },
    // ],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

app.get("/", (req, res) => {
  res.send("Inventory Management Route");
});

app.post("/api/v1/product", async (req, res) => {
  try {
    const data = await Product.create(req.body);
    // const product = new Product(req.body);
    // const data = await product.save();
    res
      .status(200)
      .json({ status: "success", message: "Data inserted successfully", data });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Something Wen't Wrong",
      error: error.message,
    });
  }
});

module.exports = app;
