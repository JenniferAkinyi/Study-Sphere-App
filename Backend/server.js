import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

// import routers
import userRouter from './routes/user.router.js';
import authRouter from './routes/auth.router.js';


const app = express();
const port = process.env.PORT || 3000;


app.use(errorHandler);
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors(
    {
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    }
));
app.use(morgan('dev'))

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.get('/api/healthcheck', (req, res) => {
  res.send('Server is running');
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});