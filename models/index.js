const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  port: dbConfig.port, // Make sure the port is being used here

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.matches = require("./matches.js")(sequelize, Sequelize);
db.users = require("./users.js")(sequelize, Sequelize);
db.teams = require("./teams.js")(sequelize, Sequelize);
db.players = require("./players.js")(sequelize, Sequelize);
db.contacts = require("./contactQueries.js")(sequelize, Sequelize);


// Define associations
const { teams, players } = db;
teams.hasMany(players, { foreignKey: 'teamNo' }); // One team can have many players
players.belongsTo(teams, { foreignKey: 'teamNo' }); // Each player belongs to a single team


module.exports = db;