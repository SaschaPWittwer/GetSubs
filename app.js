require("dotenv").config();
require("./database/schema.js").bootstrap();
var restify = require("restify");
var directoryRoute = require("./routes/directory.js");


// Bootstrap server with routes (controllers for REST calls)
var server = restify.createServer({
    name: 'api'
});

// Use body parser
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