import express from "express";
import {addNewUser, deleteUser, getAllUsers, updateUser} from "./controller";
import {authorize, checkAuth} from "../../middleware/auth";
import {Role} from "../../helpers/role";

const router = express.Router();

router
    .route('/')
    .get([checkAuth, authorize(Role.SuperAdmin)],
        getAllUsers);

router
    .route('/')
    .post([checkAuth, authorize(Role.SuperAdmin)],
        addNewUser);

router
    .route('/:id')
    .put(
        [checkAuth, authorize(Role.SuperAdmin)],
        updateUser);

router
    .route('/:id')
    .delete(
        [checkAuth, authorize(Role.SuperAdmin)],
        deleteUser);

export default router;
