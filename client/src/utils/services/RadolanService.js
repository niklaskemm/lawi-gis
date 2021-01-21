import Api from "./api"

export default {
  getRadolanByGeom(filter, geom) {
    return Api().post("/api/radolan/get/bygeom", { filter, geom })
  },

  getRadolanByGridId(gridId) {
    return Api().get(`/api/radolan/get/bygridid/${gridId}`)
  }
}
