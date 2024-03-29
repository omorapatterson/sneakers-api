const t = require('tcomb')

const LayoutSlide = t.struct({
  entityType: t.maybe(t.enums.of(['release', 'offer', 'collection'])),
  entityId: t.maybe(t.String),
  imgUrl: t.maybe(t.String),
  description: t.maybe(t.String)
}, {
  defaultProps: {
  }
})

module.exports = LayoutSlide
