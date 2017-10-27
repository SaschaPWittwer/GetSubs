require("dotenv").config();
var restify = require("restify");
var directoryRoute = require("./routes/directory.js");

// Bootstrap server with routes (controllers for REST calls)
var server = restify.createServer();

// Add logger
server.use(function(req, res, next){
   console.log(req.getRoute());
   next();
});

directoryRoute.register(server);

// Start server
server.url = process.env.GETSUB_URL;
server.listen(process.env.GETSUB_PORT, process.env.GETSUB_HOST, function() {
    console.log("%s listening at %s", server.name, server.url);
});

server.on("close", function(){
    console.log("server stopped listening at %s", server.url);
});