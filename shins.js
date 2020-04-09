const fs = require('fs');
const yaml = require('js-yaml');
const shins = require('shins');

const optionFilePath = './options/shins-option.yml'
const indexFilePath = './source/index.html.md';
const htmlFilePath = './index.html';

function render() {
    let option = yaml.safeLoad(fs.readFileSync(optionFilePath, 'utf8'));
    const mdString = fs.readFileSync(indexFilePath, 'utf8');
    shins.render(mdString, option, function(err, html) {
        if (err !== null) {
            console.log(err);
        } else {
            fs.writeFileSync(htmlFilePath, html, 'utf8');
        }
    });
}

module.exports = {
    render: render,
    htmlFilePath: htmlFilePath
}