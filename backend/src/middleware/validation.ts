import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};

export const validateMyUserRequest = [
  body("name").isString().notEmpty().withMessage("Name must be a string"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("AddressLine1 must be a string"),
  body("city").isString().notEmpty().withMessage("City must be a string"),
  body("country").isString().notEmpty().withMessage("Country must be a string"),
  handleValidationErrors,
];

export const validateCreateRestaurantRequest = [
  body("restaurantName").isString().notEmpty().withMessage("Restaurant name is required"),
  body("city").isString().notEmpty().withMessage("City is required"),
  body("country").isString().notEmpty().withMessage("Country is required"),
  body("deliveryPrice").isNumeric().notEmpty().withMessage("Delivery price is required"),
  body("estimatedDeliveryTime").isNumeric().notEmpty().withMessage("Estimated delivery time is required"),
  body("cuisines").isArray().notEmpty().withMessage("Cuisines are required"),
  body("menuItems").isArray().notEmpty().withMessage("Menu items are required"),
  body("menuItems.*.name").isString().notEmpty().withMessage("Menu item name is required"),
  body("menuItems.*.price").isNumeric().notEmpty().withMessage("Menu item price is required"),
  
  handleValidationErrors,
]