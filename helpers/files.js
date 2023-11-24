const uid = require('rand-token').uid;
const fs = require("fs");
const path = require('path');



async function deleteFile(fileName, pathFolder = 'image') {
    try {
        const deletePath = './public/' + pathFolder + '/' + fileName;
        await fs.unlinkSync(deletePath);
        return true
    }
    catch (e) {
        return false
    }
}



module.exports = {
    deleteFile
};
