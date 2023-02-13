import bcrypt from 'bcryptjs';
import {UserModel} from '../models/User'
import {Role} from "../helpers/role";

export const defaultSeeder = async () => {
    try {
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash('admin', salt);

        const user = {
            firstName: 'Data',
            lastName: 'Admin',
            email: 'admin@admin.com',
            password: encryptedPassword,
            role: Role.SuperAdmin,
            enabled: true
        };

        const {email} = user;

        const checkUser = await UserModel.findOne({email});

        if (!checkUser) {
            await UserModel.create(user);
        }

    } catch (err) {
        console.error(err);
    }
};