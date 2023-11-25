import "dotenv/config";
import dotenv from 'dotenv';
dotenv.config();
console.log('Immediately after dotenv.config:', process.env.FRONTEND_URL);

import express from 'express';
import Hello from "./hello.js";
import Lab5 from './Lab5.js';
import CourseRoutes from './courses/routes.js';
import ModuleRoutes from './modules/routes.js'
import AssignmentRoutes from './assignments/routes.js'
import cors from "cors";
import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017/kanbas")

const app = express();
console.log('Frontend URL:', process.env.FRONTEND_URL);

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}));

ModuleRoutes(app)
CourseRoutes(app);
AssignmentRoutes(app);

Lab5(app);

Hello(app);

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`APP LISTEN: Server running on port ${port}`);
});