import Api from "./api"

export default {
  getRadolanById(id) {
    return Api().get("/api/radolan/get/byid/:id", id)
  },

  getRadolanByGeom(geom, startDate, endDate) {
    return Api().post("/api/radolan/get/bygeom", { geom, startDate, endDate })
  },

  getRadolanByGridId(gridId, startDate, endDate) {
    return Api().post("/api/radolan/get/bygridid", {
      gridId,
      startDate,
      endDate
    })
  }

  // getRadolanByFieldId(fieldId, startDate, endDate) {
  //   return Api().post("/api/radolan/get/byfieldid", { fieldId, startDate, endDate })
  // }
}
