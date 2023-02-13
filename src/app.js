import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import moment from 'moment';
import cookieParser from 'cookie-parser';
import apiServices from './services';
import env from "./config";
import {handleError} from "./helpers/error";
import {defaultSeeder} from "./config/seeder";
import {connectToMongo} from "./config/mydb";

const rfs = require('rotating-file-stream');

export const app = express();

/* Middlewares Configurations */

connectToMongo().then(() => {
    console.log('~~ MongoDB Connected Successfully ~~')
});

defaultSeeder().then(() => {
    console.log('~~ Admin Created Successfully ~~')
});

// Setup cors origin
const corsOptions = {
    origin: '*',
    credentials: true
};
app.use(cors(corsOptions));

// Setup security feature
app.use(helmet());

// Setup morgan logger
if (env.NODE_ENV === 'production') {
    const logDirectory = path.join(__dirname, '..', 'log', `logger_${moment().unix()}.log`);
    const stream = rfs.createStream(logDirectory, {
        size: "10M", // rotate every 10 MegaBytes written
        interval: "1d", // rotate daily
        compress: "gzip" // compress rotated files
    });
    // log all requests to access.log
    app.use(logger('combined', {
        stream: stream
    }));
} else {
    /*
    log only 4xx and 5xx responses to console , {
        skip: function (req, res) { return res.statusCode < 400 }
    }
    */
    app.use(logger('dev'));
}

// Setup express body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Setup express cookie parser
app.use(cookieParser());

// Setup express public directory
app.use(express.static(path.join(__dirname, 'public')));

// Setup express main route apis
app.use('/api', apiServices);

// Setup express exception Handling
app.use((err, req, res, next) => {
    handleError(err, res);
});