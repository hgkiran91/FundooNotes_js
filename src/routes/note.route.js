import express from 'express';
import { newNoteValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';
import * as noteController from '../controllers/note.controller';

const router = express.Router();

// route to create a new note
router.post('', newNoteValidator, userAuth, noteController.addNote);

// route to get all notes
router.get('', userAuth, noteController.getAllNotes);

// route to get single note
router.get('/:_id', userAuth, noteController.getNote);

// route to update a note by id
router.put('/:_id', userAuth, noteController.updateNote);

//route to delete a note by id
router.delete('/:_id', userAuth, noteController.deleteNote);

// route to archive a note by id
router.put('/:_id/isarchive', userAuth, noteController.archiveNote);

// route to trash a note by id
router.put('/:_id/isTrash', userAuth,noteController.trashNote);

export default router;