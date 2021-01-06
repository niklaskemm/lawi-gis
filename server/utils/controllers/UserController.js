const User = require("./../../database/models").user

module.exports = {
  async index(req, res) {
    try {
      const users = await User.findAll()
      res.send(users)
    } catch (err) {
      res.status(500).send({
        err
      })
    }
  }
}
