const { v4: uuidv4 } = require("uuid")

module.exports = {
  up: [
    {
      id: uuidv4(),
      geom: "",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  down: [{}]
}
