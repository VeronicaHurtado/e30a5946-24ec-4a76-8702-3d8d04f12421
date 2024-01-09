const fs = require('fs/promises');
const path = require('path');
const dataPath = path.join(process.cwd(), '/src/data');

const readFile = async (fileName) => {
    return await fs.readFile(`${dataPath}/${fileName}`).then(data => {
        return JSON.parse(data.toString());
    }).catch(error => {
        console.log(error);
    });
};

module.exports = {
    readFile
}