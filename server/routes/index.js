const TestController = require("../utils/controllers/TestController")
const UserController = require("../utils/controllers/UserController")
const RadolanController = require("../utils/controllers/RadolanController")
const GridController = require("../utils/controllers/GridController")

module.exports = (app) => {
  app.get("/api/radolan", RadolanController.index)
  app.get("/api/radolanbyid/:id", RadolanController.getDataById)
  app.get("/api/radolanbygridid/:grid_id", RadolanController.getDataByGridId)

  app.get("/api/grid", GridController.index)
  app.get("/api/grid/:lon/:lat", GridController.getGridByLatLon)

  app.get("/api/users", UserController.index)
}
