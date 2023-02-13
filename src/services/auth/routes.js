import express from "express";
import {authLogin, getCurrentUser} from "./controller";
import {checkAuth} from "../../middleware/auth";

const router = express.Router();

router
    .route('/current')
    .get(checkAuth, getCurrentUser);

router
    .route('/token')
    .post(authLogin);

export default router;
