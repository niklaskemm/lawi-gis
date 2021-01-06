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
      const radolan_data = await RadolanData.findByPk(id)
      if (radolan_data) {
        res.send(radolan_data)
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
      const radolan_data = await RadolanData.findAll({
        where: {
          grid_id: grid_id
        }
      })
      if (radolan_data) {
        res.send(radolan_data)
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
