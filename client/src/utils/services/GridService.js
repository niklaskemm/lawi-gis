import Api from "./api";

export default {
  getGridByGeom(filter, geom) {
    return Api().post(`/api/grid/bygeom`, { filter, geom });
  }
};
