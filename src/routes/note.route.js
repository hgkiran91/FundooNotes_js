import express from 'express';
import { newNoteValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';
import * as noteController from '../controllers/note.controller';
import { redisNotes } from '../middlewares/redis.middleware';

const router = express.Router();

// route to create a new note
router.post('', newNoteValidator, userAuth, noteController.addNote);

// route to get all notes
router.get('', userAuth, redisNotes, noteController.getAllNotes);

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

//route to pin a note by id
router.put('/:_id/isPin', userAuth, noteController.pinNote);

//route to get note by label name
router.get('/:Label', noteController.getNoteByLabelName);

//route to add label to the note
router.post('/:noteId', noteController.addLabel);

//route to delete label from note
router.delete('/:noteId/deleteLabel', noteController.deleteLabel);
export default router;