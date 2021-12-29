const express = require('express');
const history = require('connect-history-api-fallback');
const path = require('path');
const app = express();

// load .env configuration
//require('dotenv').config();

// Middleware for serving '/dist' directory
const staticFileMiddleware = express.static('dist');

// 1st call for unredirected requests
app.use(staticFileMiddleware);

// Support history api
app.use(history({
    index: '/dist/index.html'
}));

// render index.html on history mode
app.get('*', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, 'dist') });
});

// 2nd call for redirected requests
app.use(staticFileMiddleware);

let HOST = "localhost"
let PORT = 8080

app.listen(PORT, HOST, function () {
    console.log(`Client vue app listening on http://${HOST}:${PORT}`);
});