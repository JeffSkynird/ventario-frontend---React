export function getLastOfferById (offers) {
  offers.sort((a, b) => (a.id > b.id) ? 1 : -1)
  return offers[offers.length-1]
}