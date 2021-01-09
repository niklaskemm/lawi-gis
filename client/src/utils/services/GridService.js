import Api from "./api"

export default {
  getGridById(filter, geom) {
    return Api().post(`/api/grid/bygeom`, { filter, geom })
  }
}
