function getImageURL(fileName, folderName) {
    return process.env.APP_PROJECT_PATH + `images/${folderName}/` + fileName;
}


module.exports = {
    getImageURL,
};
