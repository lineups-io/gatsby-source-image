const createNodeHelpers = require('gatsby-node-helpers').default

const {
  createNodeFactory,
  generateNodeId,
} = createNodeHelpers({
  typePrefix: 'LandingPage',
})

const PAGE_TYPE = 'Page'
const APARTMENT_TYPE = 'Apartment'
const IMAGE_TYPE = 'Image'

exports.PageNode = createNodeFactory(PAGE_TYPE, node => {
  node.children = node.apartments.items.map(apartment =>
    generateNodeId(APARTMENT_TYPE, apartment.id)
  )

  delete node.apartments

  return node
})

exports.ApartmentNode = createNodeFactory(APARTMENT_TYPE, node => {
  if (node.defaultPhoto)
    node.children = [generateNodeId(IMAGE_TYPE, node.defaultPhoto.id)]

  delete node.defaultPhoto

  return node
})

exports.ImageNode = createNodeFactory(IMAGE_TYPE)
