const db = require("../../database/models/index")
const Field = require("../../database/models").field

module.exports = {
  async index(req, res) {
    try {
      // const grid = await gridgeom.findAll({})
      // res.send(grid)
      res.send("Nope. Too much data.")
    } catch (err) {
      res.status(500).send({ error: err })
    }
  },

  async postField(req, res) {
    try {
      const field = await Field.create(req.body)
      res.send(field)
    } catch (err) {
      if ((err.name = "SequelizeDatabaseError")) {
        res.status(400).send(`Invalid input syntax: ${req.body}`)
      } else {
        res.status(503).send({ error: err })
      }
    }
  }
}
