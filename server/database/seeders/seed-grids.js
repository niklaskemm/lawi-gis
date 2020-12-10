"use strict"

const data = require("./data/grids")

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("gridgeoms", data.up)
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("gridgeoms", data.down)
  }
}
