import { Request, Response } from "express";
import Restaurant from "../models/restaurant";

const searchRestaurants = async (req: Request, res: Response) => {
    try {
        const { city } = req.params;
        const searchQuery = (req.query.search as string) || "";
        const selectedCuisine = (req.query.cuisine as string) || "";
        const sortOption = (req.query.sort as string) || "lastUpdated";
        const page = parseInt(req.query.page as string) || 1;

        const query: any = {};
        query[city] = new RegExp(searchQuery, "i");
        const cityCheck = await Restaurant.countDocuments(query);
        if (cityCheck === 0) {
            return res.status(404).json([]);
        }
        if (selectedCuisine) {
            const cusinArray = selectedCuisine.split(",").map((cusine: string) => new RegExp(cusine, "i"));
            query.cuisine = { $all: cusinArray };
        }
        if (searchQuery) {
            const searchRegex = new RegExp(searchQuery, "i");
            query.$or = [
                { restaurantName: searchRegex },
                { cuisine: { $in: searchRegex } },
            ]
        }
        const pageSize = 10;
        const skip = (page - 1) * pageSize;

        const restaurants = await Restaurant.find(query)
        .sort({[sortOption]: 1})
        .skip(skip)
        .limit(pageSize)
        .lean();

        const total = await Restaurant.countDocuments(query);
        const response={
            data: restaurants,
            pagination:{
                total,
                page,
                Pages: Math.ceil(total / pageSize)
            }
            }
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error searching restaurants" });
    }
};

export default {
    searchRestaurants,
}
