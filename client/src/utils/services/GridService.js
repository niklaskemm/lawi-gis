import Api from "./api"

export default {
  getGridByGeom(geom) {
    return Api().post(`/api/grids/get/bygeom`, { geom })
  }
}
