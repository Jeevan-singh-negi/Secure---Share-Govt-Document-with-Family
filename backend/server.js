import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middlewares/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import documentroutes from './routes/documentRoutes.js';
import shareRoutes from './routes/shareRoutes.js';
import adminRoutes from './routes/adminRoutes.js';


dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json()); // For JSON requests

// Routes 
app.use('/api/auth', authRoutes);

app.use('/api/users', userRoutes)

app.use('/api/documents', documentroutes)

app.use('/api/share', shareRoutes);

app.use('/api/admin', adminRoutes)


app.get('/', (req, res) => {
  res.send('API is running...');})


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
