import HttpStatus from 'http-status-codes';
// import noteService from '../services/note.service';
import * as noteService from '../services/note.service';

/**
 * Controller to get all users available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */

export const addNote = async (req, res, next) => {
    try {
        console.log("Request body inside controller", req.body);
        const data = await noteService.addNote(req.body);
        // console.log("req.body", req.body)
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
            message: 'note created successfully'
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`
        });
    }
};

/**
 * Controller to get all users available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllNotes = async (req, res, next) => {
    try {
        // console.log("Body", body);
        // console.log("Request body for get all notes", req.body);
        const data = await noteService.getAllNotes(req.body);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'All notes fetched successfully'
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Controller to get a single user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getNote = async (req, res, next) => {
    try {
        const data = await noteService.getNote(req.params._id, req.body);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'User fetched successfully'
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Controller to update a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateNote = async (req, res, next) => {
    try {
        const data = await noteService.updateNote(req.params._id, req.body);
        res.status(HttpStatus.ACCEPTED).json({
            code: HttpStatus.ACCEPTED,
            data: data,
            message: 'Note updated successfully'
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Controller to archive note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const archiveNote = async (req, res, next) => {
    try {
        const data = await noteService.archiveNote(req.params._id, req.body.UserID);
        res.status(HttpStatus.ACCEPTED).json({
            code: HttpStatus.ACCEPTED,
            data: data,
            message: 'Note archived successfully'
        });
    } catch (error) {
        next(error);
    }
};

/**
* Controller to trash note
* @param  {object} req - request object
* @param {object} res - response object
* @param {Function} next
*/
export const trashNote = async (req, res, next) => {
    try {
        const data = await noteService.trashNote(req.params._id, req.body.UserID);
        res.status(HttpStatus.ACCEPTED).json({
            code: HttpStatus.ACCEPTED,
            data: data,
            message: 'Note trashed successfully'
        });
    } catch (error) {
        next(error);
    }
};

/**
* Controller to trash note
* @param  {object} req - request object
* @param {object} res - response object
* @param {Function} next
*/
export const pinNote = async (req, res, next) => {
    try {
        const data = await noteService.pinNote(req.params._id, req.body.UserID);
        res.status(HttpStatus.ACCEPTED).json({
            code: HttpStatus.ACCEPTED,
            data: data,
            message: 'Note pinned successfully'
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Controller to delete a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deleteNote = async (req, res, next) => {
    try {
        await noteService.deleteNote(req.params._id, req.body.UserID);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: [],
            message: 'Note deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};