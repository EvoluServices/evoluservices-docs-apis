const fs = require('fs');
const yaml = require('js-yaml');

function parseIntroduction() {
    let introData = yaml.safeLoad(fs.readFileSync('./docs/introduction.yml', 'utf8'));
    return introData;
}

function parse(templateName, stage, data) {
    data.introduction = parseIntroduction();
    return data;
}

module.exports = {
    parse: parse 
}