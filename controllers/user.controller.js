const { signUpService, findUserByEmail } = require("../services/user.service");
const extractModelError = require("../utils/extractModelError");
const { generateToken } = require("../utils/token");

exports.signUp = async (req, res) => {
  try {
    const user = await signUpService(req.body);
    res.status(200).json({
      status: "success",
      message: "Successfully signed up",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: extractModelError(error),
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        status: "fail",
        error: "Please provide your credentials",
      });
    }
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        status: "fail",
        error: "No user found. Please create an account",
      });
    }
    const isPasswordValid = await user.comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: "fail",
        error: "Wrong password",
      });
    }
    if (user.status !== "active") {
      return res.status(401).json({
        status: "fail",
        error: "Account is not activated",
      });
    }
    const token = generateToken(user);
    const { password: pwd, ...others } = user.toObject();
    res.status(200).json({
      status: "success",
      message: "Successfully logged in",
      data: {
        user: others,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.getMe = async(req, res) => {
  try {
    const user = await findUserByEmail(req.user.email);
    res.status(200).json({
      status: "success",
      data: user
    })
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error
    });
  }
};
