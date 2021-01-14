import Api from "./api"

export default {
  getRadolanByGeom(filter, geom) {
    return Api().post("/api/radolan/bygeom", { filter, geom })
  },

  getRadolanByGridId(gridId) {
    return Api().get(`/api/radolan/bygridid/${gridId}`)
  }
}
