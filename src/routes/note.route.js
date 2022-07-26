import express from 'express';
import { newNoteValidator } from '../validators/user.validator';
import * as noteController from '../controllers/note.controller';
<<<<<<< HEAD
import { forgetAuth, userAuth } from '../middlewares/auth.middleware';
// import * as redis from '../middlewares/radis.middleware';
=======
import { userAuth } from '../middlewares/auth.middleware';
>>>>>>> UserRegistrationAndLogin
import get from 'mongoose';

const router = express.Router();

// route to create a new note
<<<<<<< HEAD
router.post('', newNoteValidator, userAuth, noteController.addNote);
=======
router.post('',newNoteValidator ,userAuth, noteController.addNote);
>>>>>>> UserRegistrationAndLogin

// route to get all notes
router.get('/', userAuth, noteController.getAllNotes);

// route to get single note
router.get('/:_id', userAuth, noteController.getNote);

// route to update a note by id
router.put('/:_id', userAuth, noteController.updateNote);

//route to delete a note by id
router.delete('/:_id', userAuth, noteController.deleteNote);

// route to archive a note by id
router.put('/:_id/isarchive', userAuth, noteController.archiveNote);

// route to trash a note by id
router.put('/:_id/isTrash', userAuth, noteController.trashNote);

export default router;