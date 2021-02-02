const db = require("../../database/models/index")

module.exports = {
  async getIntersectionAreaByIds(req, res) {
    const { fieldId } = req.body
    const { gridId } = req.body
    try {
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
        res
          .status(400)
          .send(
            `Invalid input syntax for fieldId, gridId: ${(fieldId, gridId)}`
          )
      } else {
        res.status(503).send({ error: err })
      }
    }
  }
}
