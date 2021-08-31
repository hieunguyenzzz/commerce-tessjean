export const getAllBlogQuery = /* GraphQL */ `
  query getAllBlogs($first: Int = 250) {
    articles(first: $first) {
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
export default getAllBlogQuery
