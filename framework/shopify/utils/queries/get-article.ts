export const getArticle = /* GraphQL */ `
  query getArticle($first: Int = 250, $query: String) {
    articles(first: $first, query: $query) {
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
`
export default getArticle
