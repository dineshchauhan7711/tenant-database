// Files
const config = require('./config/config');
require('./helpers/global');

// Modules
var express = require('express');
var path = require('path');
const fs = require('fs')
var app = express();

app.set('trust proxy', true);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Database
const db = require('./config/db');

//Routes
const tenantRoutes = require('./routes/tenant.routes');
app.use('/api/v1', tenantRoutes);


let server
if (config.protocol == 'https') {
    const https = require('https')
    server = https.createServer({
        key: fs.readFileSync(config.certificate.privkey, 'utf8'),
        cert: fs.readFileSync(config.certificate.fullchain, 'utf8')
    }, app);
} else {
    const http = require('http')
    server = http.createServer(app);
};

server.listen(3000, () => {
    console.log(`Server Running on PORT 3000`);
});