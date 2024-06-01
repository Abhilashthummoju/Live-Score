module.exports = (sequelize, Sequelize) => {
    const teams = sequelize.define("teams", {
      teamNo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      teamName: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
    teams.associate = (models) => {
        teams.hasMany(models.players, { foreignKey: 'teamNo' });
      };
    
    return teams;
  };