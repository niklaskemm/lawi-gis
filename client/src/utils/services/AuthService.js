import Api from "./api"

export default {
  login(email, password) {
    return Api().post("/api/login", { email, password })
  }
}
