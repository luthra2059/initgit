const fs = require('fs');
const path = require('path');

exports.getCurrentDirectoryBase = () => {
    return path.basename(process.cwd())
}

exports.directoryExists = (filePath) => {
    try {
        return fs.statSync(filePath).isDirectory();
    } catch (err) {
        return false
    }
}

