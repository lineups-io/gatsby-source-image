const connect = require('./client')
const query = require('./query')
const { ImageNode } = require('./nodes')

exports.sourceNodes = ({ actions }, { uri, key, account }) => {
  const { createNode } = actions

  const client = connect(uri, key)
  const variables = { account, offset: 0, limit: 20 }

  return client.query({ query, variables }).then(({ data }) => {
    data.pages.items.forEach(page => {
      page.apartments.items.forEach(apartment => {
        if (apartment.defaultPhoto) {
          createNode(ImageNode({
            pageId: page.id
            ...apartment.defaultPhoto
          }))
        }
      })
    })
  })
}
