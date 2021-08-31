export const getCustomercare = /* GraphQL */ `
  query getCustomercare($first: Int = 250) {
    blogs(first: 250, query: "title:Customer Care") {
      edges {
        node {
          title
          handle
          seo {
            title
            description
          }
          articles(first: 250) {
            edges {
              node {
                title
              }
            }
          }
        }
      }
    }
  }
`
export default getCustomercare
