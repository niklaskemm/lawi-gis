"use strict"

const users = require("./data/users")

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", users.up)
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", users.down)
  }
}
