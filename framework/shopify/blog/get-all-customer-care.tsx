import { Article } from '@commerce/types'
import { getConfig, ShopifyConfig } from '@framework/api'
import { ArticleEdge } from '@framework/schema'
import { getAllBlogQuery, normalizeBlog } from '@framework/utils'

type Variables = {
  first?: number
}

type ReturnType = {
  articles: Article[]
}

const getAllBlogs = async (options?: {
  variables?: Variables
  config: ShopifyConfig
  preview?: boolean
}): Promise<ReturnType> => {
  let { config, variables = { first: 250 } } = options ?? {}
  config = getConfig(config)
  const { data } = await config.fetch(getAllBlogQuery, { variables })
  const articles = data.articles?.edges?.map(({ node }: ArticleEdge) =>
    normalizeBlog(node)
  )

  return { articles }
}

export default getAllBlogs
