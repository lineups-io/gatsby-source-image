const connect = require('./client')
const query = require('./query')
const { ImageNode } = require('./nodes')

// FIXME: iterate until all pages have been processed
exports.sourceNodes = ({ actions }, { uri, key, account }) => {
  const { createNode } = actions

  const client = connect(uri, key)
  const variables = { account, offset: 0, limit: 50 }

  let created = 0

  return client.query({ query, variables }).then(({ data }) => {
    data.pages.items.forEach(page => {
      page.apartments.items.forEach(apartment => {
        if (apartment.defaultPhoto) {
          createNode(ImageNode({
            pageId: page.id,
            ...apartment.defaultPhoto
          }))

          created += 1
        }
      })
    })

    console.log('[gatsby-source-image]', created, 'nodes created')
  })
}
