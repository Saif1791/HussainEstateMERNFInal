import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const access_token = req.cookies.access_token;
  if (!access_token) {
    return next(errorHandler(401, "Unauthroized!"));
  }

  jwt.verify(access_token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(401), "Forbidden!");

    req.user = user;
    next();
  });
};
