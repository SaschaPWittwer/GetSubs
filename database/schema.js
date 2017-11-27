var Sequelize = require("sequelize");
var sequelize = new Sequelize(process.env.GETSUB_MYSQL_DB, process.env.GETSUB_MYSQL_USER, process.env.GETSUB_MYSQL_PW, {
    host: process.env.GETSUB_MYSQL_HOST,
    dialect: 'sqlite',
    // SQLite only
    storage: './database/devDb.sqlite'
});

var Directory = sequelize.define("directory", {
    name: Sequelize.STRING,
    path: Sequelize.STRING,
    lastSync: Sequelize.DATE,
    watch: Sequelize.BOOLEAN
});

var Video = sequelize.define("video", {
    name: Sequelize.STRING,
    path: Sequelize.STRING,
    hasSubs: Sequelize.BOOLEAN
});

// var User = sequelize.define("user", {
//     name: Sequelize.STRING,
//     password: Sequelize.STRING
// })

// var Session = sequelize.define("session", {
//     token: Sequelize.STRING
// })

// Session.belongsTo(User);

Video.belongsTo(Directory);

exports.Directory = Directory;
exports.Video = Video;
// exports.User = User;
// exports.Session = Session;
exports.bootstrap = function() {
    sequelize.sync({ force: true });
}