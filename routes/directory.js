function get(req, res, next){
    req.connection.query("SELECT * FROM `Directory`", function(err, results) {
        req.connection.end(function(err){
            console.log("Connection closed");
        });
        if (err){
            console.log(err);
        }
        else{
            var payload = [];
            results.forEach(function(row) {
                console.log(row);
                payload.push(row);
            }, this);
           
            res.json(200, {directories: payload});
        }
    });
}

function post(req, res, next) {
    req.connection.query("INSERT INTO Directory SET ?", req.body.directory, function(err, results) {
        req.connection.end();
        if (err){
            console.log("Error", req.body);
        }
        else{
            console.log("Object inserted with id: ", results.insertedId);
            res.send(201);
        }
    });
}

exports.register = function(restifyServer) {
    restifyServer.get("/directories", get);
    restifyServer.post("/directories", post);
    restifyServer.opts("/directories", function(req, res, next){
        console.log(req);
        res.send(200);
    });
}