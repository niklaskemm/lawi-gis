const db = require("../../database/models/index")
const GridData = require("../../database/models").gridgeom

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

  async getGridById(req, res) {
    const { id } = req.params
    try {
      const data = await GridData.findByPk(id)
      if (data) {
        res.send(data)
      } else {
        res.status(404).send("No data found.")
      }
    } catch (err) {
      if ((err.name = "SequelizeDatabaseError")) {
        res.status(400).send(`Invalid input syntax for type integer: "${id}"`)
      } else {
        res.status(503).send({ error: err })
      }
    }
  },

  async getGridByGeom(req, res) {
    const { geom } = req.body
    try {
      const [data, metadata] = await db.sequelize.query(
        `SELECT * FROM gridgeoms g WHERE ST_INTERSECTS(g.geom, ST_GEOMFROMTEXT('${geom}', 4326))`
      )
      // metadata contains .rows with the same info as in data
      if (data[0]) {
        res.send(metadata)
      } else {
        res.status(404).send("No data found.")
      }
    } catch (err) {
      if ((err.name = "SequelizeDatabaseError")) {
        res.status(400).send(`Invalid input syntax for "${geom}"`)
      } else {
        res.status(503).send({ error: err })
      }
    }
  }
}
