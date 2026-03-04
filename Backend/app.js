import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import userRouter from "./routes/user.router.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

// middleware
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// socket.io
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
});

// routes
app.use("/users", userRouter);

export { app, server };