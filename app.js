import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config';

// API Routes
import authRoutes from './routes/api/auth';
import maskerRoutes from './routes/api/masker';
import userRoutes from './routes/api/users';

const { MONGO_URI, MONGO_DB_NAME } = config;

const app = express();

// CORS Middleware
app.use(cors());
// BodyParoser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB Config
const db = `${MONGO_URI}/${MONGO_DB_NAME}`;

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB Connected ...'))
  .catch((err) => console.log(err));

// Use Routes
app.use('/api/masker', maskerRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

export default app;