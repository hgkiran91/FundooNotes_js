import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { resetAuth, userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all users
router.post('/login', userController.userLogin);

//route to create a new user
router.post('', newUserValidator, userController.userRegistration);

//route to get all users
router.post('/login', userController.userLogin);

// route for forgot password
router.post('/forgotpassword', userController.forgotPassword)

// route for reset password
router.post('/:token', resetAuth, userController.resetPassword);

export default router;
