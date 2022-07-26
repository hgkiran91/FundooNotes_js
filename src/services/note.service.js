import Note from '../models/note.model';
// import client from '../config/redis';
// import { cli } from 'winston/lib/winston/config';
import { resetAuth } from '../middlewares/auth.middleware';
import { sendMail } from '../utils/mailSender';

//create new note
export const addNote = async (body) => {
    const data = await Note.create(body);
    return data;
};

// get all note
export const getAllNotes = async (body) => {
    const data = await Note.find({UserID: body.UserID});
    return data;
};

// get single note
export const getNote = async (_id, body) => {
    const data = await Note.findById({_id, UserId: body.UserID});
    return data;
};

// update single note
export const updateNote = async (_id, body) => {
    const data = await Note.findByIdAndUpdate({ _id: _id, UserID: body.UserID}, body, { new: true });
    return data;
};

// archive single note
export const archiveNote = async (_id, body) => {
    const data = await Note.findByIdAndUpdate({ _id: _id, UserID: body.UserID}, {isArchived: true }, {new: true});
    return data;
};

// trash single note
export const trashNote = async (_id, body) => {
    const data = await Note.findByIdAndUpdate({ _id: _id, UserID: body.UserID}, {isDeleted: true }, {new: true});
    return data;
};

// delete single note
export const deleteNote = async (_id, UserID) => {
    await Note.findByIdAndDelete({ _id, UserID: UserID});
};