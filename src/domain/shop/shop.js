const t = require('tcomb')
const ShopWorkingHours = require('./shop_working_hours')

const Shop = t.struct({
  name: t.String,
  type: t.maybe(t.enums.of(['virtual', 'physical'])),
  description: t.maybe(t.String),
  siteUrl: t.maybe(t.String),
  active: t.maybe(t.Boolean),
  country: t.maybe(t.String),
  region: t.maybe(t.String),
  zipCode: t.maybe(t.String),
  address: t.maybe(t.String),
  shippingDetails: t.maybe(t.String),
  shippingCountries: t.maybe(t.enums.of(['Worldwide', 'Europe', 'USA', 'Select Countries'])),
  countries: t.maybe(t.String),
  trackingListBaseUrl: t.maybe(t.String),
  mainImage: t.maybe(t.String),
  currency: t.maybe(t.String),
  parent: t.maybe(t.String),
  showOnRegion: t.maybe(t.enums.of(['USA', 'Europe', 'Marketplaces'])),
  isParent: t.maybe(t.Boolean),
  rank: t.maybe(t.Number),
  lat: t.maybe(t.Number),
  lon: t.maybe(t.Number),
  workingHours: t.maybe(t.list(ShopWorkingHours)),
  defaultOfferLabel: t.maybe(t.String),
  brands: t.list(t.String),
  categories: t.list(t.String)
}, {
  defaultProps: {
    brands: [],
    categories: [],
    workingHours: [],
    currency: 'EUR',
    isParent: false
  }
})

module.exports = Shop
