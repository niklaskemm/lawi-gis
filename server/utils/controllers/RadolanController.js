const db = require("../../database/models/index")
const GridData = require("../../database/models").gridgeom
const RadolanData = require("../../database/models").radolan_data

module.exports = {
  async index(req, res) {
    try {
      // const radolan_data = await RadolanData.findAll({})
      // res.send(radolan_data)
      res.send("Nope. Too much data.")
    } catch (err) {
      res.status(500).send({ error: err })
    }
  },

  async getDataById(req, res) {
    const { id } = req.params
    try {
      const data = await RadolanData.findByPk(id)
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

  async getDataByGridId(req, res) {
    const { grid_id } = req.params
    try {
      const data = await RadolanData.findAll({
        where: {
          grid_id: grid_id
        }
      })
      if (data) {
        res.send(data)
      } else {
        res.status(404).send("No data found.")
      }
    } catch (err) {
      if ((err.name = "SequelizeDatabaseError")) {
        res
          .status(400)
          .send(`Invalid input syntax for type integer: "${grid_id}"`)
      } else {
        res.status(503).send({ error: err })
      }
    }
  },

  async getDataByGeom(req, res) {
    try {
      const { filter } = req.body
      const { geom } = req.body
      const [data, metadata] = await db.sequelize.query(
        `SELECT ${filter} FROM radolan_data rd JOIN gridgeoms g ON rd.grid_id = g.id WHERE ST_INTERSECTS(g.geom, ST_GEOMFROMTEXT('${geom}', 4326));`
      )
      // metadata contains .rows with the same info as in data
      if (data) {
        res.send(metadata)
        // console.log(metadata.rowCount)
      } else {
        res.status(404).send("No data found.")
      }
    } catch (err) {
      if ((err.name = "SequelizeDatabaseError")) {
        res.status(400).send(`Invalid input syntax for type integer: "${geom}"`)
      } else {
        res.status(503).send({ error: err })
      }
    }
  }
}
