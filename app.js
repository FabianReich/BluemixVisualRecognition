/*eslint-env node */
var http = require('http'),
    imageRecognition = require('./ImageTraining/ImageTrainer');


var server = http.createServer(function(req, res) {
    if(req.url == "/"){
        imageRecognition.deleteFirstClassifierAndCreateClassifier("DefaultClassifier");
        res.writeHead(200);
        res.end('For more information visit: https://github.com/FabianReich/BluemixVisualRecognition \nor write me an email reich.fabian@gmx.de');
    }
});
server.listen(8080);