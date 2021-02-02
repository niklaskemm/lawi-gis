import Api from "./api"

export default {
  getIntersectionAreaById(gridId, fieldId) {
    return Api().post("/api/misc/get/intersectionarea", { gridId, fieldId })
  }
}
