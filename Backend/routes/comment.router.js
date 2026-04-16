import express from "express";
import { getEssayComment, postComment, editComment } from "../controllers/commentController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const commentRouter = express.Router();

commentRouter.post("/:groupId/:essayId/comment", authenticateUser, postComment);
commentRouter.get('/:groupId/:essayId/allcomments', getEssayComment)
commentRouter.patch('/:id/edit', authenticateUser, editComment)

export default commentRouter;