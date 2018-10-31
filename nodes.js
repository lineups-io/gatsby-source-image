const createNodeHelpers = require('gatsby-node-helpers').default

const {
  createNodeFactory,
} = createNodeHelpers({
  typePrefix: 'LandingPage',
})

const IMAGE_TYPE = 'Image'

exports.ImageNode = createNodeFactory(IMAGE_TYPE)
