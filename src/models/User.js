import mongoose from 'mongoose';
import {Role} from "../helpers/role";

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    enabled: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: Role.User
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    // ,
    // files: [
    //     {type: mongoose.Schema.Types.ObjectId, ref: 'Files'}
    // ]
});

export const UserModel = mongoose.model('User', UserSchema);