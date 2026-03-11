import express from "express";
import { getGroupComment, postComment } from "../controllers/commentController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const commentRouter = express.Router();

commentRouter.post("/:groupId/comments", authenticateUser, postComment);
commentRouter.get('/:groupId/allcomments', getGroupComment)

export default commentRouter;