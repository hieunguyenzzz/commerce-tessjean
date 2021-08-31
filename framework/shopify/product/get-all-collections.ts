import { Collection } from '@commerce/types'
import { normalizeProduct } from '@framework/utils'
import { getConfig, ShopifyConfig } from '../api'
import { CollectionEdge } from '../schema'
import getAllCollectionsQuery from '../utils/queries/get-all-collections-query'

type ReturnType = {
  categories: Collection[]
}
const getAllCollections = async (options?: {
  variables?: any
  config: ShopifyConfig
  preview?: boolean
}): Promise<ReturnType> => {
  let { config, variables = { first: 250 } } = options ?? {}
  config = getConfig(config)

  const { data } = await config.fetch(getAllCollectionsQuery, { variables })
  const edges = data.collections?.edges ?? []

  const categories = edges.map(
    ({
      node: { id, title: name, handle, products, descriptionHtml },
    }: CollectionEdge) => ({
      id,
      name,
      path: `/${handle}`,
      slug: `${handle}`,
      descriptionHtml,
      products:
        products?.edges?.map(({ node: p }) => normalizeProduct(p)) ?? [],
    })
  )

  return {
    categories,
  }
}

export default getAllCollections
