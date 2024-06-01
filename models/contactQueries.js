module.exports = (sequelize, Sequelize) => {
    const matches = sequelize.define("matches", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      message: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
    return matches;
  };