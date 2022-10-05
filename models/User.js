const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    validate: [validator.isEmail, "Please provide a valid email"],
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, "Email address is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    validate: {
      validator: (value) => {
        validator.isStrongPassword(value, {
          minLength: 6,
          minLowercase: 1,
          minNumbers: 1,
          minUppercase: 1,
          minSymbols: 1,
        });
      },
      message: "Password {VALUE} is not strong enough",
    },
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Password is not equal",
    },
  },
  role: {
    type: String,
    enum: ["buyer", "store-manager", "admin"],
    default: "buyer",
  },
  firstName: {
    type: String,
    required: [true, "Please provide a first name"],
    trim: true,
    minLength: [2, "Name must be at least two characters long"],
    maxLength: [100, "Name is too large"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide a first name"],
    trim: true,
    minLength: [3, "Name must be at least three characters long"],
    maxLength: [100, "Name is too large"],
  },
  contactNumber: {
    type: String,
    validate: [validator.isMobilePhone, "Please provide a valid phone number"],
  },
  shippingAddress: String,
  imageURL: {
    type: String,
    validate: [validator.isURL, "Please provide a valid url"],
  },
  status: {
    type: String,
    enum: ["active", "inactive", "blocked"],
    default: "active",
  },
  passwordChangedAt: Date,
  passwordChangeToken: Date,
  passwordChangeExpires: Date,
});

userSchema.pre("save", async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.comparePassword = async function (password, hash) {
  return await bcrypt.compare(password, hash);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
