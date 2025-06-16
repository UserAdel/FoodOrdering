import express, { Request, Response } from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose, { mongo } from 'mongoose';



const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_CONNECTION_STRING as string)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.log(err);
});

app.get('/test', (req: Request, res: Response) => {
    res.json({ message: 'Server is running!'});
});

app.listen(7000, () => {
    console.log(`Server is running on port 7000`);
});