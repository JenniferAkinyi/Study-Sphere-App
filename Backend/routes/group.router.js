import express from "express";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import { createGroup, deleteGroupById, fetchById, getAllGroups, updatedGroupByid, myGroups, discoverGroups } from "../controllers/groupController.js";

const groupRouter = express.Router()
groupRouter.post('/creategroup',authenticateUser, createGroup)
groupRouter.get('/allgroups', getAllGroups)
groupRouter.get('/mygroups', authenticateUser, myGroups)
groupRouter.get('/discover', authenticateUser, discoverGroups)
groupRouter.get('/:id', fetchById)
groupRouter.patch('/:id', updatedGroupByid)
groupRouter.delete('/:id', deleteGroupById)

export default groupRouter