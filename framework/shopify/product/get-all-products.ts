import { GraphQLFetcherResult } from '@commerce/api'
import { Product } from '@commerce/types'
import { getConfig, ShopifyConfig } from '../api'
import { ProductEdge } from '../schema'
import { normalizeProduct } from '../utils/normalize'
import { getAllProductsQuery } from '../utils/queries'

type Variables = {
  first?: number
  field?: string
}

type ReturnType = {
  products: Product[]
}

const getAllProducts = async (options: {
  variables?: Variables
  config?: ShopifyConfig
  preview?: boolean
}): Promise<ReturnType> => {
  let { config, variables = { first: 250 } } = options ?? {}
  config = getConfig(config)

  const { data }: GraphQLFetcherResult = await config.fetch(
    getAllProductsQuery,
    { variables }
  )

  const products =
    data.products?.edges?.map(({ node: p }: ProductEdge) =>
      normalizeProduct(p)
    ) ?? []

  return {
    products,
  }
}

export default getAllProducts
