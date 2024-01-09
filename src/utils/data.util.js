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

const sortArrayByObjectDateProperty = (array, propertyName) => {
    return  array.sort((a, b) => a[`${propertyName}`] - b[`${propertyName}`]);
}

module.exports = {
    readFile,
    sortArrayByObjectDateProperty
}