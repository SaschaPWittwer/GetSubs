var mysql = require("mysql");

var connection = mysql.createConnection({
    host: process.env.GETSUB_MYSQL_HOST,
    port: process.env.GETSUB_MYSQL_PORT,
    user: process.env.GETSUB_MYSQL_USER,
    password: process.env.GETSUB_MYSQL_PW,
    database: process.env.GETSUB_MYSQL_DB
});

function get(req, res, next){
    connection.query("SELECT * FROM `Directory`", function(err, results) {
        if (err){
            console.log(err);
        }
        else{
            var payload = [];
            results.forEach(function(row) {
                console.log(row);
                payload.push(row);
            }, this);
            connection.end(function(err){
                console.log("Connection closed");
            });

            res.send(200, {directories: payload});
        }
    });
}

function put(req, res, next) {
    // todo implement
}

exports.register = function(restifyServer) {
    restifyServer.get("/directories", get);
    restifyServer.put("/directories", put);
}