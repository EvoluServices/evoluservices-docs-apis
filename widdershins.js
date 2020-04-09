const fs = require('fs');
const yaml = require('js-yaml');
const widdershins = require('widdershins');
const parser = require('./parser.js');

const optionFilePath = './options/widdershins-option.yml';
const indexFilePath = './source/index.html.md';

function convert(swaggerFile, callback) {
    // Widdershins options
    let option = yaml.safeLoad(fs.readFileSync(optionFilePath, 'utf8'));

    option.templateCallback = parser.parse;

    widdershins.convert(swaggerFile, option)
    .then(str => {
        fs.writeFileSync(indexFilePath, str, 'utf8');
        callback(str);
    })
    .catch(err => {
        console.error("Error converting to .md file: ", err)
    });
}

module.exports = {
    convert: convert,
    mdFilePath: indexFilePath
}