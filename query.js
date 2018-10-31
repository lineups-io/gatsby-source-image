const gql = require('graphql-tag')

module.exports = gql`
  query getPhotos($account:ID $offset:Int $limit:Int) {
    pages: findPages(filter: { account:$account status:published } offset:$offset limit:$limit) {
      count
      items {
        id: publicId

        account {
          menu {
            title
            href
            subMenu {
              title
              subTitle
              href
            }
          }
          markets {
            count
            items {
              title: market
              apartments(filter: { status:published }) {
                count
                items {
                  name
                  marketingWebsiteUrl
                }
              }
            }
          }
        }

        slug
        title
        description
        copy
        breadcrumb {
          market {
            title: market
            marketPage {
              slug
            }
            nonMarketPages {
              title
              slug
            }
          }
          submarket {
            title: submarket
            marketPage {
              slug
            }
            nonMarketPages {
              title
              slug
            }
          }
          submarkets {
            title: submarket
            marketPage {
              slug
            }
          }
        }
        center: coordinates {
          lat
          lng
        }
        zoom: mapZoom

        apartments(filter: { status:published }) {
          count
          items {
            id: publicId
            name
            address {
              line1
              city
              state
            }
            coordinates {
              lat
              lng
            }
            marketingWebsiteUrl
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
