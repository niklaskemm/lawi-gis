module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        "fields",
        "geom",
        {
          type: Sequelize.GEOMETRY,
          allowNull: false
        }
      )
    ]);
  },

  down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn("fields", "geom")
    ]);
  }
};