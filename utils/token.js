const jwt = require("jsonwebtoken");
exports.generateToken = (userInfo) => {
  const payload = {
    _id: userInfo._id,
    email: userInfo.email,
    role: userInfo.role,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};
