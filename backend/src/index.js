import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';
import messageRouter from './routes/message.route.js';
import {connectDB} from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';



dotenv.config();
const app = express();
app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true,
}));

// app.use(express.json());
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const PORT = process.env.PORT;

app.use('/api/auth', authRouter);
app.use('/api/messages', messageRouter);

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
  connectDB();
}
);