const fs = require('fs');
const yaml = require('js-yaml');
const widdershins = require('widdershins');

const optionFilePath = './options/widdershins-option.yml';
const sourceFilePath = './source/';

function convert(swaggerFile, callback) {
    // Widdershins options
    let option = yaml.safeLoad(fs.readFileSync(optionFilePath, 'utf8'));

    widdershins.convert(swaggerFile, option)
    .then(str => {
        fs.writeFileSync(sourceFilePath + option.convertFile, str, 'utf8');
        callback(str);
    })
    .catch(err => {
        console.error("Error converting to .md file: ", err)
    });
}

module.exports = {
    convert: convert,
}