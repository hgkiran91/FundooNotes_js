import express from 'express';
import { labelValidator } from '../validators/user.validator';
import { labelAuth, userAuth } from '../middlewares/auth.middleware';
import * as labelController from '../controllers/label.controller';

const router = express.Router();

//route to add label for the note
router.post('', labelValidator, labelAuth, labelController.addLabel);

//route to update the label
router.put('/:_id', labelAuth, labelController.updateLabel);

//route to delete label
router.delete('/:_id', userAuth, labelController.deleteLabel);

export default router;