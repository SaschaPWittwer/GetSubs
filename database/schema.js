var Sequelize = require("sequelize");
var sequelize = new Sequelize(process.env.GETSUB_MYSQL_DB, process.env.GETSUB_MYSQL_USER,process.env.GETSUB_MYSQL_PW, {
    host: process.env.GETSUB_MYSQL_HOST,
    dialect: 'sqlite',
    // SQLite only
    storage: './database/devDb.sqlite'
});

var Directory = sequelize.define("directory", {
    name: Sequelize.STRING,
    path: Sequelize.STRING,
    lastSync: Sequelize.DATE
});

var Video = sequelize.define("video", {
    name: Sequelize.STRING,
    path: Sequelize.STRING,
    hasSubs: Sequelize.BOOLEAN
});

Video.belongsTo(Directory);

exports.Directory = Directory;
exports.Video = Video;
exports.bootstrap = function() {
    sequelize.sync({ force: true });
}