function get(req, res, next){
    
    let result = {
        users: [{
            name: "Sascha",
            isAdmin: "false"
        }, {
            name: "Yves",
            isAdmin: "true"
        }]
    }
    res.send(result);
}

exports.register = function(restifyServer) {
    restifyServer.get("/hello/:id", get);
}