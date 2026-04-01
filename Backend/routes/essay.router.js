import express from 'express'
import { authenticateUser } from '../middlewares/authMiddleware.js'
import { deleteEssay, essayById, getGroupEssay, postEssay, updateEssay } from '../controllers/essayController.js'

const essayRouter = express.Router()
essayRouter.post('/:groupId/postessay', authenticateUser, postEssay)
essayRouter.get('/:groupId/essay', authenticateUser, getGroupEssay)
essayRouter.patch('/:groupId/:id', authenticateUser, updateEssay)
essayRouter.get('/:groupId/:id', authenticateUser, essayById)
essayRouter.delete('/:groupId/:id', authenticateUser, deleteEssay)

export default essayRouter