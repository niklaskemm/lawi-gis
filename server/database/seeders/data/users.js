const { v4: uuidv4 } = require("uuid")
const bcrypt = require("bcryptjs")

module.exports = {
  up: [
    {
      id: uuidv4(),
      firstname: "Niklas",
      lastname: "Kemm",
      email: "niklas.kemm@googlemail.com",
      password: bcrypt.hashSync("password", 8),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      firstname: "Hannes",
      lastname: "Braun",
      email: "hannes.braun@googlemail.com",
      password: bcrypt.hashSync("password", 8),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      firstname: "Lina",
      lastname: "Stoeckler",
      email: "lina.stoeckler@googlemail.com",
      password: bcrypt.hashSync("password", 8),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      firstname: "Helge",
      lastname: "Schneider",
      email: "helge.schneider@googlemail.com",
      password: bcrypt.hashSync("password", 8),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  down: [{}]
}
