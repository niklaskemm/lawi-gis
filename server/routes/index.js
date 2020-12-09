const TestController = require("../utils/controllers/TestController")

module.exports = (app) => {
  app.post("/test", TestController.test)
}
