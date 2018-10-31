const gql = require('graphql-tag')

module.exports = gql`
  query getPhotos($account:ID $offset:Int $limit:Int) {
    pages: findPages(filter: { account:$account status:published } offset:$offset limit:$limit) {
      count
      items {
        id: publicId
        apartments(filter: { status:published }) {
          count
          items {
            defaultPhoto {
              id: publicId
              url
              alt
              title
            }
          }
        }
      }
    }
  }
`
