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

  async getFieldById(req, res) {
    const { id } = req.params
    try {
      const field = await Field.findByPk(id)
      if (field) {
        res.send(field)
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

  async getFieldArea(req, res) {
    const { id } = req.params
    try {
      const [data, metadata] = await db.sequelize.query(
        `SELECT ST_AREA(ST_TRANSFORM(f.geom, 'EPSG:25832')) FROM fields f where f.id = '${id}'`
      )
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

  async getIntersectionArea(req, res) {
    try {
      const { fieldId } = req.body
      const { gridId } = req.body
      const [data, metadata] = await db.sequelize.query(
        `SELECT ST_AREA(
          ST_TRANSFORM(
            ST_INTERSECTION(
              (SELECT g.geom FROM gridgeoms g WHERE g.id = '${gridId}'),
              (SELECT f.geom FROM fields f WHERE f.id = '${fieldId}')
            ), 'EPSG:25832'
          )
        )`
      )
      if (data) {
        res.send(data)
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
