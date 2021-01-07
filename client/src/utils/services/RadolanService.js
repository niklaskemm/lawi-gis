import Api from "@/utils/services/Api"

export default {
  index() {
    return Api().get("offers")
  },

  filteredOffers(filterObject) {
    return Api().post("filteredOffers", filterObject)
  },

  getOfferById(offerId) {
    return Api().get(`offers/${offerId}`, {
      params: {
        offer_id: offerId
      }
    })
  },
  post(offer) {
    return Api().post("offers", offer)
  },

  update(offer) {
    return Api().post("updateOffer", offer)
  },
  delete(offer) {
    return Api().delete("offers", {
      data: offer
    })
  }
}
