var fs = require("fs");

exports.doStuff = function () {
    fs.readdir(process.env.GETSUB_MOVIES, function(err, files){
        if (err){
            console.log(err);
        }

        files.forEach(function(file) {
            console.log(file);
        }, this);

    });
}