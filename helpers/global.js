/**
 * Define here all helpers file as global variable
 */

// Provide sucess and error related response method 
if (!global.RESPONSE)
    global.RESPONSE = require('./response.js');

// Provide file manipulation related functions 
if (!global.FILEACTION)
    global.FILEACTION = require('./files');

// Provide assets url functions
if (!global.ASSETS)
    global.ASSETS = require('./assets.js');





