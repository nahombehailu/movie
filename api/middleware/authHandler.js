import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { asyncHandler } from '../middleware/asyncHandler.js';
import { errorHandler } from "../utils/error.js";

// Check if the user is authenticated or not
export const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  // Read JWT from the 'jwt' cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      next(error)
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// Check if the user is admin or not
export const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    next(errorHandler(401,"Not authorized as an admin"));
  }
};

