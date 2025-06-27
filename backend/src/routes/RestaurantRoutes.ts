import express, { RequestHandler } from "express";
import { param } from "express-validator";
import restaurantController from "../controllers/restaurantController";

const router = express.Router();

router.get("/search/:city", 
    param("city").isString().trim().notEmpty().withMessage("city parameter must be valid string"),
    restaurantController.searchRestaurant as RequestHandler
);

router.get("/:restaurantId", 
    param("restaurantId").isString().trim().notEmpty().withMessage("restaurantId parameter must be valid string"),
    restaurantController.getRestaurant as RequestHandler
);
  
export default router;



