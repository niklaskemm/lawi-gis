const db = require("../../database/models/index")
const Field = require("../../database/models").field
const User = require("../../database/models").user

module.exports = {
  async index(req, res) {
    try {
      const fields = await Field.findAll({})
      res.send(fields)
      // res.send("Nope. Too much data.")
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
        res.status(400).send(`Invalid input syntax for id: "${id}"`)
      } else {
        res.status(503).send({ error: err })
      }
    }
  },

  async getFieldByUserId(req, res) {
    const { userid } = req.params
    try {
      const fields = await Field.findAll({
        include: {
          model: User,
          where: {
            id: userid
          }
        }
      })
      if (fields) {
        res.send(fields)
      } else {
        res.status(404).send("No data found.")
      }
    } catch (err) {
      if ((err.name = "SequelizeDatabaseError")) {
        res.status(400).send(`Invalid input syntax for: "${userId}"`)
      } else {
        res.status(503).send({ error: err })
      }
    }
  },

  async getFieldByGeom(req, res) {
    const { geom } = req.body
    try {
      const [data, metadata] = await db.sequelize.query(
        `SELECT * FROM fields f WHERE ST_INTERSECTS(f.geom, ST_GEOMFROMTEXT('${geom}', 4326))`
      )
      if (data) {
        res.send(data)
      } else {
        res.status(404).send("No data found.")
      }
    } catch (err) {
      if ((err.name = "SequelizeDatabaseError")) {
        res.status(400).send(`Invalid input syntax for geom: "${geom}"`)
      } else {
        res.status(503).send({ error: err })
      }
    }
  },

  async getFieldAreaById(req, res) {
    const { id } = req.params
    try {
      const [data, metadata] = await db.sequelize.query(
        `SELECT ST_AREA(ST_TRANSFORM(f.geom, 'EPSG:25832')) FROM fields f where f.id = '${id}'`
      )
      if (data[0]) {
        res.send(data)
      } else {
        res.status(404).send("No data found.")
      }
    } catch (err) {
      if ((err.name = "SequelizeDatabaseError")) {
        res.status(400).send(`Invalid input syntax for id: "${id}"`)
      } else {
        res.status(503).send({ error: err })
      }
    }
  },

  async postField(req, res) {
    try {
      const { field, user } = req.body
      const creator = await User.findByPk(user.id)
      const newField = await Field.create(field)
      await creator.addField(newField)
      const result = await User.findOne({
        where: {
          id: user.id
        },
        include: Field
      })
      res.send(result)
    } catch (err) {
      if ((err.name = "SequelizeDatabaseError")) {
        res.status(400).send(`Invalid input syntax: ${req.body}`)
      } else {
        res.status(503).send({ error: err })
      }
    }
  }
}
