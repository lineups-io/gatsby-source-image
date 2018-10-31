const connect = require('./client')
const query = require('./query')
const { PageNode, ApartmentNode, ImageNode } = require('./nodes')

exports.sourceNodes = ({ actions }, { uri, key, account }) => {
  const { createNode } = actions

  const client = connect(uri, key)
  const variables = { account, offset: 0, limit: 20 }

  return client.query({ query, variables }).then(({ data }) => {
    data.pages.items.forEach(page => {
      const pageNode = PageNode(page)
      createNode(pageNode)

      page.apartments.items.forEach(apartment => {
        const apartmentNode = ApartmentNode(apartment, {
          parent: pageNode.id
        })
        createNode(apartmentNode)

        if (apartment.defaultPhoto) {
          createNode(ImageNode(apartment.defaultPhoto, {
            parent: apartmentNode.id
          }))
        }
      })
    })
  })
}
