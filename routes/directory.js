var { Directory } = require("../database/schema.js");

function get(req, res, next){
    Directory.findAll().then(directories => {
        res.json(200, { directories: directories });    
    })
}

function post(req, res, next) {
    Directory.create(req.body.directory).then(directory => {
        res.json(200, { directories: directory });
    })
}

exports.register = function(restifyServer) {
    restifyServer.get("/directories", get);
    restifyServer.post("/directories", post);
    restifyServer.opts("/directories", function(req, res, next){
        console.log(req);
        res.send(200);
    });
}