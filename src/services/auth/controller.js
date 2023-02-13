import {UserModel} from "../../models/User";
import env from "../../config";
import ErrorHandler from "../../helpers/error";

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Get Info For Current User
export const getCurrentUser = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.userId).select('-password');
        res.send(user);
    } catch (err) {
        next(new ErrorHandler(500, 'Internal Server Error', null));
    }
};

export const authLogin = async (req, res, next) => {
    const {email, password} = req.body;
    try {
        let user = await UserModel.findOne({email});

        if (!user || user.enabled !== true) {
            next(new ErrorHandler(400, 'Invalid login information', null));
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            next(new ErrorHandler(401, 'Invalid login credentials', null));
        }
        const payload = {
            userId: user.id
        };

        jwt.sign(payload, env.JWT_SECRET, {
                expiresIn: env.JWT_EXPIRE
            }, (err, token) => {
                if (err) throw err;
                res.status(200).send({token: token})
            }
        );
    } catch (error) {
        next(new ErrorHandler(500, 'Internal Server Error', null));
    }
};