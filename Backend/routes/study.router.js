import express from 'express'
import { authenticateUser } from '../middlewares/authMiddleware.js'
import { logStudyMinutes, getWeeklyStudyData } from '../controllers/studyController.js'

const studyRouter = express.Router()
studyRouter.post('/log', authenticateUser, logStudyMinutes)
studyRouter.get('/weekly/:userId', authenticateUser, getWeeklyStudyData)

export default studyRouter