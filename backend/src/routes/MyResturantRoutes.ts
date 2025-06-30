import express, { RequestHandler } from "express";
import myResturantController from "../controllers/myResturantController";
import multer from "multer";
import { jwtCheck,jwtParse} from "../middleware/auth";
import { validateCreateRestaurantRequest } from "../middleware/validation";


const router =express.Router();

const storage=multer.memoryStorage();
const upload=multer({
    storage,
    limits:{
        fileSize:5*1024*1024
    }
});



router.get(
    "/order",
    jwtCheck,
    jwtParse,
    myResturantController.getMyRestaurantOrders as RequestHandler
  );
  
  router.patch(
    "/order/:orderId/status",
    jwtCheck,
    jwtParse,
    myResturantController.updateOrderStatus as RequestHandler
  );

router.get("/",jwtCheck, jwtParse, myResturantController.getMyRestaurant as RequestHandler);
router.post("/",upload.single("imageFile"),validateCreateRestaurantRequest,jwtCheck, jwtParse, myResturantController.createMyRestaurant as RequestHandler);
router.put("/",upload.single("imageFile"),validateCreateRestaurantRequest,jwtCheck, jwtParse, myResturantController.updateMyRestaurant as RequestHandler);
export default router; 