var { User } = require("../database/schema.js");
var jwt = require("jsonwebtoken");

function post(req, res, next) {
    User.findOne({
        name: req.body.username,
        password: req.body.password
    }).then(user => {
        if (!user){
            res.json(400, { success: false });
        }
        else {
            var payload = {
                user: user.name
            };

            var token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: 900
            });

            res.json(200, { success: true, token: token });
        }
    });
}

function middleware (req, res, next) {
    var token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (token){
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error){
                return res.json({ success: false });
            } else {
                req.decodedToken = token;
                next();
            }
        })
    } else {
        return res.send(403, { success: false });
    }
}

exports.register = function(restifyServer) {
    restifyServer.use(middleware);
    restifyServer.post("/api/authenticate", post);
    restifyServer.opts("/api/authenticate", function(req, res, next){
        console.log(req);
        res.send(200);
    });
}