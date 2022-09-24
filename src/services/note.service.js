import Note from '../models/note.model';
import { client } from '../config/redis';
import Label from '../models/label.model';

//create new note
export const addNote = async (body) => {
    const data = await Note.create(body);
    if (data) {
        await client.del('Notes')
    }
    return data;
};

// get all note
export const getAllNotes = async (body) => {
    const data = await Note.find(body);
    if (data) {
        client.set('Notes', JSON.stringify(data));
    }
    return data;
};

// get single note
export const getNote = async (_id, body) => {
    const data = await Note.findById({ _id, UserId: body.UserID });
    return data;
};

// update single note
export const updateNote = async (_id, body) => {
    const data = await Note.findByIdAndUpdate({ _id: _id, UserID: body.UserID }, body, { new: true });
    return data;
};

// archive single note
export const archiveNote = async (_id, body) => {
    const data = await Note.findByIdAndUpdate({ _id: _id, UserID: body.UserID }, { isArchived: true }, { new: true });
    return data;
};

// trash single note
export const trashNote = async (_id, body) => {
    const data = await Note.findByIdAndUpdate({ _id: _id, UserID: body.UserID }, { isDeleted: true }, { new: true });
    return data;
};

// Pin single note
export const pinNote = async (_id, body) => {
    const data = await Note.findByIdAndUpdate({ _id: _id, UserID: body.UserID }, { isPin: true }, { new: true });
    return data;
};

// delete single note
export const deleteNote = async (_id, UserID) => {
    await Note.findByIdAndDelete({ _id, UserID: UserID });
};

// get note by label name
// export const getNoteByLabelName = async (Label) => {
//     const data = await Note.findOne({Label: Label});
//     return data;
// };

// adding label
export const addLabel = async (noteId, LabelId) => {
    const labelCheck = await Label.find({ _id: LabelId })
    if (labelCheck != null) {
        const data = await Note.findByIdAndUpdate({ _id: noteId }, { LabelId: LabelId }, { new: true });
        return data;
    }
};

// delete label
export const deleteLabel = async (noteId, LabelId) => {
    // const noteCheck = await Note.findOne({ _id: noteId });
    // if(noteCheck.LabelId == LabelId){
    //     const data = await Note.findByIdAndUpdate({Label: LabelId});
    //     return data;
    // }

    const data = await Note.findByIdAndUpdate({ _id: noteId }, { LabelId: [LabelId.del] }, {new: true} );
    return data;
};