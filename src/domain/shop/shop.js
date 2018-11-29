const t = require('tcomb')
const { makeEntity } = require('../helper')

const Shop = makeEntity(t.struct({
  name: t.String,
  active: t.maybe(t.Boolean),
  country: t.maybe(t.String),
  region: t.maybe(t.String),
  address: t.maybe(t.String),
  shippingDetails: t.maybe(t.String),
  trackingListBaseUrl: t.maybe(t.String),
  currency: t.maybe(t.String),
  rank: t.maybe(t.Number)
}))

module.exports = Shop
