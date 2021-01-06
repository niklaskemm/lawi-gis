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

  async getGridByLatLon(req, res) {
    const { lon } = req.params
    const { lat } = req.params
    try {
      const [grid, metadata] = await db.sequelize.query(
        `SELECT id, geom FROM gridgeoms WHERE ST_CONTAINS(geom, ST_GeomFromText('POINT (${lon} ${lat})', 4326))`
      )
      if (grid) {
        res.send(grid)
        // console.log(metadata.rowCount)
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
  }
}
