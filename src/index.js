import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import {responseHelper } from './middleware/index.js';
import path from "path";

import "./associations/index.js";


import userRoutes from './modules/user/routes/index.js';
import userManagementRoutes from './modules/employee/routes/index.js'
import productRoutes from './modules/productmaster/routes/index.js';
import financeRoutes from "./modules/finance/routes/index.js";



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use(responseHelper);

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get('/', (req, res) => {
  res.send("Hello World!!").status(404);
}
);

app.get('/api/data', (req, res) => {
  res.sendSuccess({ value: 42 }, 'Data fetched successfully');
});

app.get('/api/error', (req, res) => {
  res.sendError('Something went wrong', 422, [{ field: 'email', message: 'Invalid' }]);
});

//routes
app.use('/ims_api/v1', userRoutes);

app.use('/ims_api/v1', userManagementRoutes);

app.use('/ims_api/v1', productRoutes);

app.use("/ims_api/v1", financeRoutes)



app.use((req, res) => {
  return res.sendError('Route not found', 404);
});

export default app;