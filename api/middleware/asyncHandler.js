import { errorHandler } from "../utils/error.js";
export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
    next(error)
    });
  };
  
 