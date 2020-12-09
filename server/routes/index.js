const TestController = require("../utils/controllers/TestController")
const UserController = require("../utils/controllers/UserController")

module.exports = (app) => {
  app.post("/test", TestController.test)
  app.post("/register", UserController.register)

  app.get("/users", UserController.index)
}
