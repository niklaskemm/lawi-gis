import Api from "./api"

export default {
  // getFieldByGeom(filter, geom) {
  //   return Api().post("/api/fields/get/bygeom", { filter, geom })
  // },

  postField(info) {
    return Api().post("/api/fields/post", info)
  }
}
