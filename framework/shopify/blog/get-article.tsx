import { Article } from '@commerce/types'
import { getConfig, ShopifyConfig } from '@framework/api'
import { ArticleEdge } from '@framework/schema'
import { getArticleQuery, normalizeBlog } from '@framework/utils'

type Variables = {
  first?: number
  query?: string
}

type ReturnType = {
  article: Article
  articles: Article[]
}

const getArticle = async (options?: {
  variables?: Variables
  config: ShopifyConfig
  preview?: boolean
}): Promise<ReturnType> => {
  let { config, variables = { first: 250 } } = options ?? {}
  config = getConfig(config)
  const { data } = await config.fetch(getArticleQuery, { variables })
  const articles = data.articles?.edges?.map(({ node }: ArticleEdge) =>
    normalizeBlog(node)
  )

  return { article: articles[0], articles: articles }
}

export default getArticle
