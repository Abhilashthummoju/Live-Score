module.exports = (sequelize, Sequelize) => {
    const matches = sequelize.define("matches", {
      matchNo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      team1: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      team2: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      venue:{
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
    return matches;
  };