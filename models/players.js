module.exports = (sequelize, Sequelize) => {
    const players = sequelize.define("players", {
      playerId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      playerName: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
    players.associate = (models) => {
        players.belongsTo(models.teams, { foreignKey: 'teamNo' });
      };
    return players;
  };