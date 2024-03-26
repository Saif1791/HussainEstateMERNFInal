import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import Listing from "../models/listing.model.js";

export const test = (req, res) => {
  res.json({ mssg: "Hello Saif" });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id != req.params.id) {
    return next(errorHandler(401, "You are not authorized!"));
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req, body, password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          userName: req.body.userName,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id != req.params.id) {
    return next(errorHandler(401, "You can only delete your account!"));
  }

  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json({ mssg: "User has been deleted!" });
  } catch (err) {
    next(err);
  }
};

export const getListings = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (err) {
      next(err);
    }
  } else {
    return next(errorHandler(401, "You can only get your own listings!"));
  }
};

export const getLandlord = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(errorHandler("404", "User not found!"));
  }

  const { password, ...rest } = user._doc;
  res.status(200).json(rest);
};
