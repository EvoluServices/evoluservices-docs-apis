const fs = require('fs');
const yaml = require('js-yaml');
const shins = require('shins');

const optionFilePath = './options/shins-option.yml'
const sourcePath = './source/';
const htmlFilePath = './portal.html';

function render() {
    let option = yaml.safeLoad(fs.readFileSync(optionFilePath, 'utf8'));

    let mdFiles = option.pages;

    mdFiles.forEach(function(item, index) {
        let filePath = sourcePath + item;
        console.log('Rendering ' + filePath);
        let mdString = fs.readFileSync(filePath, 'utf8');
        shins.render(mdString, option, function(err, html) {
            let htmlFilePath = item.substring(0, item.lastIndexOf('.'));
            if (err !== null) {
                console.log(`Cannot render ${htmlFilePath}: ${err}`);
            } else {
                fs.writeFileSync(htmlFilePath, html, 'utf8');
                console.log(htmlFilePath + ' successfully rendered.');
            }
        });
    });
}

module.exports = {
    render: render
}