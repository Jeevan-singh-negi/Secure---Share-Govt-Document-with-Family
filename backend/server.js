import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middlewares/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import documentroutes from './routes/documentRoutes.js';

dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json()); // For JSON requests

// Routes 
app.use('/api/auth', authRoutes);

app.use('/api/users', userRoutes)

app.use('/api/documents', documentroutes)





app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
