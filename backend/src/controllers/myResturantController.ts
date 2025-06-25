import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";




const getMyRestaurant = async (req: Request, res: Response) => {


    try {
        const restaurant = await Restaurant.findOne({ user: req.userId });
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }
            res.json(restaurant);


    } catch (error) {
        console.error("Error getting restaurant:", error);
        return res.status(500).json({ message: "Error getting restaurant" });
    }
}


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

        res.status(201).json(restaurant);
    } catch (error) {
        console.error("Error creating restaurant:", error);
        return res.status(500).json({ message: "Error creating restaurant" });
    }
}




const updateMyRestaurant = async (req: Request, res: Response) => { 

    try {
        const restaurant = await Restaurant.findOne({ user: req.userId });
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }
        restaurant.restaurantName=req.body.restaurantName;
        restaurant.city=req.body.city;
        restaurant.country=req.body.country;
        restaurant.deliveryPrice=req.body.deliveryPrice;
        restaurant.estimatedDeliveryTime=req.body.estimatedDeliveryTime;
        restaurant.cuisines=req.body.cuisines;
        restaurant.menuItems=req.body.menuItems;
        restaurant.lastUpdated=new Date();
        if (req.file) {
            const imageUrl = await uploadImage(req.file as Express.Multer.File);
            restaurant.imageUrl = imageUrl;
          }
        await restaurant.save();
        res.status(200).send(restaurant);


    } catch (error) {
        console.error("Error updating restaurant:", error);
        return res.status(500).json({ message: "Error updating restaurant" });
    }
}


const uploadImage = async (file: Express.Multer.File) => {
    const image = file;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;
  
    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
    return uploadResponse.url;
  };


export default {
    createMyRestaurant,
    getMyRestaurant,
    updateMyRestaurant
}
