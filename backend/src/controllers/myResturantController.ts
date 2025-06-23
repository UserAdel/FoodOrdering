
import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

const createMyRestaurant  = async (req: Request, res: Response) => {
    try {
        const existingRestaurant = await Restaurant.findOne({ user: req.userId })
        if (existingRestaurant) {
            return res.status(400).json({ message: "You already have a restaurant" })
        }
        const { restaurantName, city, country, deliveryPrice, estimatedDeliveryTime, cuisines, menuItems } = req.body;
        const image = req.file as Express.Multer.File;
        const base64Image = Buffer.from(image.buffer).toString("base64");
        const dataUrl = `data:${image.mimetype};base64,${base64Image}`;
        const uploadResponse = await cloudinary.v2.uploader.upload(dataUrl);

        const restaurant = new Restaurant(
            req.body
        )
            restaurant.imageUrl=uploadResponse.url;
            restaurant.user=new mongoose.Types.ObjectId(req.userId);
            restaurant.lastUpdated=new Date();
        await restaurant.save();

    } catch (error) {
        console.error("Error creating restaurant:", error);
        return res.status(500).json({ message: "Error creating restaurant" });
    }
}

export default {
    createMyRestaurant 
}
