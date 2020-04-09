const fs = require('fs');
const yaml = require('js-yaml')
const shins =  require('./shins.js');
const widdershins = require('./widdershins.js');
const fileData = fs.readFileSync('./docs/orders-api-docs.yml', 'utf8');
const swaggerFile = yaml.safeLoad(fileData);

widdershins.convert(swaggerFile, function() {
    shins.render();
});
