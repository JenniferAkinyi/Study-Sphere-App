import express from 'express';
import { createUserSchema } from '../middlewares/validators/userValidators.js';
import { deleteUserById, fetchById, getAllUsers, loginUser, postUser, updatedUserById  } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', createUserSchema, postUser);
userRouter.post('/login', loginUser);
userRouter.get('/allusers', getAllUsers)
userRouter.get('/:id', fetchById)
userRouter.patch('/:id', updatedUserById)
userRouter.delete('/:id', deleteUserById)
// userRouter.post('/request-password-reset', requestPasswordReset); 
// userRouter.put('/reset-password/:token', resetPassword); 

export default userRouter;