import {UserModel} from "../../models/User";
import ErrorHandler from "../../helpers/error";
import {Role} from "../../helpers/role";

const bcrypt = require('bcryptjs');
const nodeMailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

// Get All Users
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await UserModel.find({});
        res.send(users.filter(user => user.role !== Role.SuperAdmin));
    } catch (error) {
        next(new ErrorHandler(500, 'Internal Server Error', null));
    }
};

// Add New User
export const addNewUser = async (req, res, next) => {
    const {firstName, role, lastName, email, password} = req.body;
    try {
        let user = await UserModel.findOne({email});

        if (user) {
            next(new ErrorHandler(400, 'User already exists', null));
        }

        user = new UserModel({
            firstName,
            lastName,
            email,
            enabled: true
        });

        // Decrypting Password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        if (role) user.role = Role[role];

        // Save User
        const storedUser = await user.save();

        if (storedUser)
            res.send({message: 'Add User Success', data: storedUser});
    } catch (error) {
        next(new ErrorHandler(500, 'Internal Server Error', null));
    }
};

// Update User
export const updateUser = async (req, res, next) => {
    try {
        let user = await UserModel.findById(req.params.id);

        if (!user) {
            next(new ErrorHandler(404, 'User NOT Found!', null));
        }

        const {firstName, lastName, email, password, enabled} = req.body;

        if (lastName) user.lastName = lastName;
        if (firstName) user.firstName = firstName;
        if (email) user.email = email;
        if (enabled) user.enabled = enabled;
        if (password) {
            // Decrypting Password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        user = await UserModel.findByIdAndUpdate(
            req.params.id,
            {$set: user},
            {new: true}
        );

        res.send({message: 'User Updated Success', data: user});
    } catch (error) {
        next(new ErrorHandler(500, 'Internal Server Error', null));
    }
};

// Delete User
export const deleteUser = async (req, res, next) => {
    try {
        let user = await UserModel.findById(req.params.id);
        if (!user) {
            next(new ErrorHandler(404, 'User NOT Found!', null));
        }
        await UserModel.findByIdAndRemove(req.params.id);

        res.send({message: 'User Removed Success'});
    } catch (error) {
        next(new ErrorHandler(500, 'Internal Server Error', null));
    }
};
