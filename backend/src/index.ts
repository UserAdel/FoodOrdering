import express, { Request, Response } from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose, { mongo } from 'mongoose';
import myUserRoute from "./routes/MyUserRoutes"
import {v2 as cloudinary} from "cloudinary";
import myResturantRoute from "./routes/MyResturantRoutes";
import restaurantRoute from "./routes/RestaurantRoutes";
import orderRoute from "./routes/OrderRoute";

const app = express();
app.use(cors({
    origin: '*',             
    methods: '*',            
    allowedHeaders: '*',     
    credentials: true        
  }));
app.use(express.json());

mongoose.connect(process.env.MONGO_CONNECTION_STRING as string)
.then(() => {
    console.log('Connected to MongoDB');


    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME ,
        api_key: process.env.CLOUDINARY_API_KEY ,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    })

})
.catch((err) => {
    console.log(err);
});

app.use("/api/my/user",myUserRoute)
app.use("/api/my/restaurant",myResturantRoute)
app.use("/api/restaurant",restaurantRoute)
app.use("/api/order", orderRoute);


app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));
 
app.get("/", (req, res) => {
    res.send("API is running...");
  });
  

app.listen(7000, () => {
    console.log(`Server is running on port 7000`);
});