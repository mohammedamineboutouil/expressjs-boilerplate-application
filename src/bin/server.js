/**
 * Module dependencies.
 */

import http from 'http';
import {app} from "../app";
import env from "../config";

/**
 * Get port from environment and store in Express.
 */

const port = env.PORT;

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, (err) => {
    if (err) {
        console.error('Fatal error during server start: ');
        console.error(err.stack || err);
    }
    console.log(`🚀 Express.js server is listening at port ${port} on ${env.NODE_ENV} mode.`);
});
