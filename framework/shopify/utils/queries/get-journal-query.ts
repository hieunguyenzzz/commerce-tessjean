export const getJournal = /* GraphQL */ `
  query getJournal($first: Int = 250) {
    blogs(first: $first, query: "title:News") {
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
                content
                contentHtml
                handle
                publishedAt
                tags
                image {
                  id
                  originalSrc
                  transformedSrc
                }
                seo {
                  title
                  description
                }
              }
            }
          }
        }
      }
    }
  }
`
export default getJournal
