const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;
const supplierSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [100, "Name is too large"],
    },
    email: {
      type: String,
      validate: [validator.isEmail, "Provide a valid name"],
      trim: true,
      lowercase: true,
      unique: true,
    },
    brands: [
      {
        name: {
          type: String,
          trim: true,
          required: true,
        },
        id: {
          type: ObjectId,
          required: true,
          ref: "Brand",
        },
      },
    ],
    categories: [
      {
        name: {
          type: String,
          trim: true,
          required: true,
        },
        id: {
          type: ObjectId,
          required: true,
          ref: "Category",
        },
      },
    ],
    companyName: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [100, "Name is too large"],
    },
    contactNumber: {
      type: String,
      required: [true, "Please Provide a contact number"],
      validate: {
        validator: (value) => {
          return validator.isMobilePhone(value);
        },
        message: "Please provide a valid phone number",
      },
    },
    emergencyContactNumber: {
      type: String,
      required: [true, "Please Provide a emergency contact number"],
      validate: {
        validator: (value) => {
          return validator.isMobilePhone(value);
        },
        message: "Please provide a valid phone number",
      },
    },
    tradeLicense: {
      number: {
        type: String,
        required: [true, "Trade license is required"],
      },
      pdf: {
        type: String,
      },
    },
    TINCertificate: {
      number: {
        type: String,
        required: [true, "Trade license is required"],
      },
      pdf: {
        type: String,
      },
    },
    VATRegistration: {
      number: {
        type: String,
        required: [true, "Trade license is required"],
      },
      pdf: {
        type: String,
      },
    },
    presentAddress: {
      type: String,
      required: [true, "Please provide your present address"],
    },
    permanentAddress: {
      type: String,
      required: [true, "Please provide your present address"],
    },
    location: {
      type: String,
      required: true,
      enum: {
        values: [
          "dhaka",
          "chattogram",
          "rajshahi",
          "sylhet",
          "khulna",
          "barishal",
          "rangpur",
          "mymensingh",
        ],
        message: "{VALUE} is not a valid name",
      },
    },
    imageURL: {
      type: String,
      validate: [validator.isURL, "Please provide a valid url"],
    },
    nationalId: {
      number: {
        type: String,
        required: true,
      },
      frontImage: {
        type: String,
        required: [true, "Front NID Image is required"],
      },
      backImage: {
        type: String,
        required: [true, "Back NID Image is required"],
      },
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive", "discontinued"],
    },
  },
  {
    timestamps: true,
  }
);
