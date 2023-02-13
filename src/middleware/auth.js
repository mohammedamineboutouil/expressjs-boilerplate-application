import env from "../config";
import ErrorHandler from "../helpers/error";
import {UserModel} from "../models/User";

const jwt = require('jsonwebtoken');

export const checkAuth = async (req, res, next) => {
    let token = req.headers.authorization;
    // Get token from header
    if (token &&
        token.startsWith('Bearer')
    ) {
        // Get token from Bearer token in header
        token = token.split(' ')[1];
    } else {
        return res.status(401).send(new ErrorHandler(401, 'Token does not exist', null));
    }

    try {
        const decoded = jwt.verify(token, env.JWT_SECRET);

        const authUser = await UserModel.findById(decoded.userId);

        if (!authUser || authUser.enabled !== true) {
            return res.status(403).send(new ErrorHandler(403, 'Unauthorized user credentials', null));
        }

        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(500).send(new ErrorHandler(500, 'Internal Server Error', null));
    }
};
// Grant access to specific roles
export const authorize = (...roles) => {
    return async (req, res, next) => {
        const authUser = await UserModel.findById(req.userId);

        if (!authUser || authUser.enabled !== true) {
            return res.status(401).send(new ErrorHandler(401, 'Authorization failed', null));
        }

        if (!roles.includes(authUser.role)) {
            return res.status(403).send(new ErrorHandler(403, `User role ${authUser.role} is not authorized to access this route`, null));
        }
        next();
    };
};
