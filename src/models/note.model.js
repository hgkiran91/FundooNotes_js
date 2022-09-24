import { optional } from '@hapi/joi';
import { Schema, model, Mongoose } from 'mongoose';

const userSchema = new Schema(
    {
        Title: {
            type: String,
            required: true,
        },
        Descreption: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: optional
        },
        LabelId: [{
            type: String,
            // required: optional
        }],
        isArchived: {
            type: Boolean,
            // required: true
        },
        isDeleted: {
            type: Boolean,
            // required: true
        },
        isPin: {
            type: Boolean
        },
        UserID: {
            type: String
        }
    },

    {
        timestamps: true
    }
);

export default model('Note', userSchema);