import express from 'express'
import { authenticateUser } from "../middlewares/authMiddleware.js"
import { myPendingInvites, acceptInvite, declineInvite } from "../controllers/invitationController.js"

const invitesRouter = express.Router()
invitesRouter.get('/pending', authenticateUser, myPendingInvites)
invitesRouter.post("/:inviteId/accept", authenticateUser, acceptInvite);
invitesRouter.post("/:inviteId/decline", authenticateUser, declineInvite);

export default invitesRouter