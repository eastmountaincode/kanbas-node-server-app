import express from 'express';
import Hello from "./hello.js";
import Lab5 from './Lab5.js';
import CourseRoutes from './courses/routes.js';
import ModuleRoutes from './modules/routes.js'
import AssignmentRoutes from './assignments/routes.js'
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(cors({
        credientials: true,
        origin: process.env.FRONTEND_URL
    })
);

ModuleRoutes(app)
CourseRoutes(app);
AssignmentRoutes(app);

Lab5(app);

Hello(app);

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});