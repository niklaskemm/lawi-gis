const User = require("./../../database/models").User

module.exports = {
  async index(req, res) {
    try {
      const users = await User.findAll({
        where: {
          firstname: "Niklas"
        }
      })
      res.send(users)
    } catch (err) {
      res.status(500).send({
        err
      })
    }
  },
  async register(req, res) {
    try {
      const user = await User.create(req.body)
      res.send(user)
    } catch (err) {
      res.status(500).send({
        err
      })
    }
  }
}
