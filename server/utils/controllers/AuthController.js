const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("../../auth.config")
const User = require("./../../database/models").user

module.exports = {
  async login(req, res) {
    const { email, password } = req.body
    try {
      const user = await User.findOne({
        where: {
          email
        }
      })
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ id: user.id }, config.SECRET_KEY)
        res.send({ token, user })
      }
    } catch (err) {
      // res.send("Invalid email address! Please try again.")
      res.send("Invalid credentials! Please try again.")
    }
  },

  async register(req, res) {
    try {
      const user = await User.create(req.body.userInfo)
      const token = jwt.sign({ id: user.id }, config.SECRET_KEY)
      res.send({ token, user })
    } catch (err) {
      // res.send("Invalid email address! Please try again.")
      res.send(err)
    }
  }
}
