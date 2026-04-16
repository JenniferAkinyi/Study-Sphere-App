import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

import userRouter from './routes/user.router.js';
import groupRouter from "./routes/group.router.js";
import commentRouter from './routes/comment.router.js';
import invitesRouter from './routes/invites.router.js';
import essayRouter from './routes/essay.router.js';
import studyRouter from './routes/study.router.js';


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
app.use('/api/groups', groupRouter)
app.use('/api/comments', commentRouter)
app.use('/api/invites', invitesRouter)
app.use('/api/groups', essayRouter)
app.use('/api/study', studyRouter)

app.get('/api/healthcheck', (req, res) => {
  res.send('Server is running');
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});