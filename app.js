import "dotenv/config";
import dotenv from 'dotenv';
dotenv.config();
console.log('Immediately after dotenv.config:', process.env.FRONTEND_URL);

import session from "express-session";
import express from 'express';
import Hello from "./hello.js";
import Lab5 from './Lab5.js';
import CourseRoutes from './courses/routes.js';
import ModuleRoutes from './modules/routes.js'
import AssignmentRoutes from './assignments/routes.js'
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./users/routes.js";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';
mongoose.connect(CONNECTION_STRING);

const app = express();
console.log('Frontend URL:', process.env.FRONTEND_URL);

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}));

const sessionOptions = {
    secret: "1234",
    resave: false,
    saveUninitialized: false,
}

if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
}

app.use(
    session(sessionOptions)
);

app.use(express.json());

ModuleRoutes(app)
CourseRoutes(app);
AssignmentRoutes(app);

Lab5(app);

Hello(app);

UserRoutes(app);

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`APP LISTEN: Server running on port ${port}`);
});