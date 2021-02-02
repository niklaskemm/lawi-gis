import Api from "./api"

export default {
  // getFieldByGeom(filter, geom) {
  //   return Api().post("/api/fields/get/bygeom", { filter, geom })
  // },

  postField(field) {
    return Api().post("/api/fields/post", field)
  },

  getFieldById(fieldId) {
    return Api().get(`/api/fields/get/byid/${fieldId}`)
  },

  getFieldAreaById(fieldId) {
    return Api().get(`/api/fields/get/area/${fieldId}`)
  },

  getIntersectionAreaById(gridId, fieldId) {
    return Api().post("/api/fields/get/intersectionarea", { gridId, fieldId })
  }
}
