import { productConnection } from './get-all-products-query'

const getSiteCollectionsQuery = /* GraphQL */ `
  query getSiteCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          descriptionHtml
          products(
            first: $first
          ) {
            ${productConnection}
          }
        }
      }
    }
  }
`
export default getSiteCollectionsQuery
