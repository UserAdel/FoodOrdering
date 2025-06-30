import express, { Router } from "express";
import testRoute from "../controllers/testController";


const router = express.Router();

router.get("/", testRoute);

export default router;