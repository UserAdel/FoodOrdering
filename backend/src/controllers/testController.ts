import { Request, Response } from "express";



const testRoute = async (req: Request, res: Response) => {
    try {
        res.json({ message: " test API is running!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" });
    }
}

export default testRoute;