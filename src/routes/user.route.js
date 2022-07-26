import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { resetAuth, userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all users
router.post('/login', userController.userLogin);

//route to create a new user
router.post('', newUserValidator, userController.userRegistration);

// //route to get a single user by their user id
// router.get('/:_id', userAuth, userController.getUser);

// //route to update a single user by their user id
// router.put('/:_id', userController.updateUser);

// //route to delete a single user by their user id
// router.delete('/:_id', userController.deleteUser);

<<<<<<< HEAD
=======
// route for forgot password
router.post('/forgotpassword', userController.forgotPassword)

// route for reset password
router.post('/:token', resetAuth, userController.resetPassword);
>>>>>>> UserRegistrationAndLogin

export default router;
