const UserController = require("../utils/controllers/UserController")
const RadolanController = require("../utils/controllers/RadolanController")
const GridController = require("../utils/controllers/GridController")
const FieldController = require("../utils/controllers/FieldController")

module.exports = (app) => {
  app.get("/api/radolan/get", RadolanController.index)
  app.get("/api/radolan/get/byid/:id", RadolanController.getDataById)
  app.get(
    "/api/radolan/get/bygridid/:grid_id",
    RadolanController.getDataByGridId
  )
  app.post("/api/radolan/get/bygeom", RadolanController.getDataByGeom)

  app.get("/api/grids/get", GridController.index)
  app.get("/api/grids/get/byid/:id", GridController.getGridById)
  app.post("/api/grids/get/bygeom", GridController.getGridByGeom)

  app.get("/api/fields/get", FieldController.index)
  app.post("/api/fields/post", FieldController.postField)

  app.get("/api/users/get", UserController.index)
}
