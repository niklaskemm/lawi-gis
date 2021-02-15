import Api from "./api"

export default {
  getGridByGeom(geom) {
    return Api().post(`/api/grids/get/bygeom`, { geom })
  },

  getGridById(id) {
    return Api().get(`/api/grids/get/byid/${id}`)
  }
}
