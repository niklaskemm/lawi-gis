const AuthController = require("../utils/controllers/AuthController")
const UserController = require("../utils/controllers/UserController")
const RadolanController = require("../utils/controllers/RadolanController")
const GridController = require("../utils/controllers/GridController")
const FieldController = require("../utils/controllers/FieldController")
const MiscController = require("../utils/controllers/MiscController")

module.exports = (app) => {
  app.post("/api/login", AuthController.login)
  app.post("/api/register", AuthController.register)

  app.get("/api/radolan/get", RadolanController.index)
  app.get("/api/radolan/get/byid/:id", RadolanController.getDataById)
  app.post("/api/radolan/get/bygridid", RadolanController.getDataByGridId)
  // app.post("/api/radolan/get/byfieldid", RadolanController.getDataByFieldId)
  app.post("/api/radolan/get/bygeom", RadolanController.getDataByGeom)

  app.get("/api/grids/get", GridController.index)
  app.get("/api/grids/get/byid/:id", GridController.getGridById)
  app.post("/api/grids/get/bygeom", GridController.getGridByGeom)

  app.get("/api/fields/get", FieldController.index)
  app.get("/api/fields/get/byid/:id", FieldController.getFieldById)
  app.get("/api/fields/get/area/:id", FieldController.getFieldAreaById)
  app.get("/api/fields/get/byuserid/:userid", FieldController.getFieldByUserId)
  app.post("/api/fields/get/bygeom", FieldController.getFieldByGeom)
  app.post("/api/fields/post", FieldController.postField)

  app.get("/api/users/get", UserController.index)

  app.post(
    "/api/misc/get/intersectionarea",
    MiscController.getIntersectionAreaByIds
  )
}
