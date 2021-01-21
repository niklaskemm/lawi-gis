import Api from "./api"

export default {
  // getFieldByGeom(filter, geom) {
  //   return Api().post("/api/fields/get/bygeom", { filter, geom })
  // },

  postField(info) {
    return Api().post("/api/fields/post", info)
  },

  getFieldById(fieldId) {
    return Api().get(`/api/fields/get/byid/${fieldId}`)
  },

  getFieldArea(fieldId) {
    return Api().get(`/api/fields/get/area/${fieldId}`)
  },

  getIntersectionArea(gridId, fieldId) {
    return Api().post("/api/fields/get/area", (gridId, fieldId))
  }
}
