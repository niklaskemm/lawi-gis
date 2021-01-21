import Api from "./api"

export default {
  getGridByGeom(filter, geom) {
    return Api().post(`/api/grids/get/bygeom`, { filter, geom })
  }
}
