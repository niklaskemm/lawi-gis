const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const config = require("./config.js")
const morgan = require("morgan")
const { sequelize } = require("./database/models")

const app = express()
app.use(morgan("combine"))
app.use(bodyParser.json())
app.use(cors())

require("./routes")(app)

sequelize.sync({ force: true }).then(() => {
  app.listen(config.port)
  console.log(`Server started on port ${config.port}`)
})
