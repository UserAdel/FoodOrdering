import express, { Request, Response } from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose, { mongo } from 'mongoose';
import myUserRoute from "./routes/MyUserRoutes"


const app = express();
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_CONNECTION_STRING as string)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.log(err);
});

app.use("/api/my/user",myUserRoute)


app.get('/test', (req: Request, res: Response) => {
    res.json({ message: 'Server is running!'});
});


app.listen(7000, () => {
    console.log(`Server is running on port 7000`);
});