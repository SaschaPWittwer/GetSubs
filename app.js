require("dotenv").config();
var restify = require("restify");
var mysql = require("mysql");
var directoryRoute = require("./routes/directory.js");
poseHeaders: ['API-Token-Expiry']

// Bootstrap server with routes (controllers for REST calls)
var server = restify.createServer({
    name: 'api'
});

// USe body parser
server.use(restify.plugins.bodyParser());

// Add logger
server.use(function(req, res, next){
   console.log(req.getRoute());
   next();
});

// add db connection
server.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Request-Method", "POST, PUT, GET");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    req.connection = mysql.createConnection({
        host: process.env.GETSUB_MYSQL_HOST,
        port: process.env.GETSUB_MYSQL_PORT,
        user: process.env.GETSUB_MYSQL_USER,
        password: process.env.GETSUB_MYSQL_PW,
        database: process.env.GETSUB_MYSQL_DB
    });
    console.log('connection opened')
    next();
});

// Add routes
directoryRoute.register(server);

// Start server
server.url = process.env.GETSUB_URL;
server.listen(process.env.GETSUB_PORT, process.env.GETSUB_HOST, function() {
    console.log("%s listening at %s", server.name, server.url);
});

server.on("close", function(){
    console.log("server stopped listening at %s", server.url);
});