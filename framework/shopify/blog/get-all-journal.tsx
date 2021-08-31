import { GraphQLFetcherResult } from '@commerce/api'
import { Article } from '@commerce/types'
import { getConfig, ShopifyConfig } from '@framework/api'
import { ArticleEdge, BlogEdge } from '@framework/schema'
import { getJournalQuery, normalizeBlog } from '@framework/utils'

type Variables = {
  first?: number
}

type ReturnType = {
  articles: Article[]
}

const getAllJournal = async (options?: {
  variables?: Variables
  config: ShopifyConfig
  preview?: boolean
}): Promise<ReturnType> => {
  let { config, variables = { first: 250 } } = options ?? {}
  config = getConfig(config)
  const { data }: GraphQLFetcherResult = await config.fetch(getJournalQuery, {
    variables,
  })
  const articles = data.blogs.edges?.flatMap((edge: BlogEdge) => {
    return edge.node.articles?.edges?.map(({ node }: ArticleEdge) =>
      normalizeBlog(node)
    )
  })

  return { articles }
}

export default getAllJournal
