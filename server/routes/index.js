const UserController = require("../utils/controllers/UserController")
const RadolanController = require("../utils/controllers/RadolanController")
const GridController = require("../utils/controllers/GridController")

module.exports = (app) => {
  app.get("/api/radolan", RadolanController.index)
  app.get("/api/radolan/byid/:id", RadolanController.getDataById)
  app.get("/api/radolan/bygridid/:grid_id", RadolanController.getDataByGridId)
  app.post("/api/radolan/bygeom", RadolanController.getDataByGeom)

  app.get("/api/grid", GridController.index)
  app.get("/api/grid/byid/:id", GridController.getGridById)
  app.post("/api/grid/bygeom", GridController.getGridByGeom)

  app.get("/api/users", UserController.index)
}
