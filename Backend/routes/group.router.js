import express from "express";
import { createGroup, deleteGroupById, fetchById, getAllGroups, updatedGroupByid } from "../controllers/groupController.js";

const groupRouter = express.Router()
groupRouter.post('/creategroup', createGroup)
groupRouter.get('/allgroups', getAllGroups)
groupRouter.get('/:id', fetchById)
groupRouter.patch('/:id', updatedGroupByid)
groupRouter.delete('/:id', deleteGroupById)

export default groupRouter