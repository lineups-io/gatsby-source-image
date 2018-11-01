const connect = require('./client')
const query = require('./query')
const { ImageNode } = require('./nodes')

const sourceNodes = ({ actions }, options, { offset = 0, limit = 20 }) => {
  const { uri, key, account } = options
  const { createNode } = actions

  const client = connect(uri, key)
  const variables = { account, offset, limit }

  return client.query({ query, variables }).then(({ data }) => {
    const { count, items } = data.pages

    items.forEach(page => {
      page.apartments.items.forEach(apartment => {
        if (apartment.defaultPhoto) {
          createNode(ImageNode({
            pageId: page.id,
            ...apartment.defaultPhoto
          }))
        }
      })
    })

    const processed = offset + items.length
    if (count > processed) {
      return sourceNodes({ actions }, options, { offset: processed, limit })
    }
  })
}

exports.sourceNodes = sourceNodes
