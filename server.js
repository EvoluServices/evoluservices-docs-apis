var path = require('path');

var express = require('express');
var ejs = require('ejs');
var compression = require('compression');
const opn = require('opn');

var app = express();
app.use(compression());

app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

app.get('/', function(req, res) {
    res.render(path.join(__dirname, 'index.html'))
});

app.get('*.html', function(req, res) {
    res.render(path.join(__dirname, req.path))
});

app.use("/", express.static(__dirname));

var myPort = process.env.PORT || 4567;

if (process.argv.length > 2) {
    myPort = process.argv[2];
}

var server = app.listen(myPort, function() {
    var port = server.address().port;
    var url = 'http://localhost:' + port + '/';
    opn(url).catch(function(ex) {
        console.error(`Unable to open URL '${url}'`);
        console.error(ex);
    });
    console.log('Server listening at http://localhost:%s', port);
});

process.on('SIGINT', function() {
    console.log("Closing connection");
    server.close();
    console.log("Connection closed");
    process.exit();
});