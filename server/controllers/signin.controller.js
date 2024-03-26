import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signin = async (req, res, next) => {
  const password = req.body.password;
  try {
    const validUser = await User.findOne({ email: req.body.email });
    if (!validUser) {
      return next(errorHandler(401, "User not found!"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Invalid Password, Please try again!"));
    }
    const { password: pass, ...rest } = validUser._doc;
    const access_token = jwt.sign(
      { id: validUser._id },
      process.env.JWT_SECRET
    );
    res
      .cookie("access_token", access_token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (err) {
    next(err);
  }
};
