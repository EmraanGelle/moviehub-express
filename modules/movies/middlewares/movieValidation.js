import { body, validationResult } from "express-validator";

export const validateMovie = [
  body("title").notEmpty().withMessage("Title is required"),
  body("year").isInt({ min: 1900 }).withMessage("Year must be a valid number"),
  body("genre").notEmpty().withMessage("Genre is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
