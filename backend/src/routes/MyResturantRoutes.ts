import express, { RequestHandler } from "express";
import myResturantController from "../controllers/myResturantController";
import multer from "multer";
import { jwtCheck,jwtParse} from "../middleware/auth";

const router =express.Router();

const storage=multer.memoryStorage();
const upload=multer({
    storage,
    limits:{
        fileSize:5*1024*1024
    }
});




router.post("/",upload.single("imageFile"),jwtCheck, jwtParse, myResturantController.createMyRestaurant as RequestHandler);

export default router; 