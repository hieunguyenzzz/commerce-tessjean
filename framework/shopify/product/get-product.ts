import { GraphQLFetcherResult } from '@commerce/api'
import { Product } from '@commerce/types'
import { getConfig, ShopifyConfig } from '../api'
import { getProductQuery, normalizeProduct } from '../utils'

type Variables = {
  slug: string
}

type ReturnType = {
  product: Product
}

const getProduct = async (options: {
  variables: Variables
  config: ShopifyConfig
  preview?: boolean
}): Promise<ReturnType> => {
  let { config, variables } = options ?? {}
  config = getConfig(config)

  const { data }: GraphQLFetcherResult = await config.fetch(getProductQuery, {
    variables,
  })

  const { productByHandle: product } = data

  return {
    product: normalizeProduct(product),
  }
}

export default getProduct
