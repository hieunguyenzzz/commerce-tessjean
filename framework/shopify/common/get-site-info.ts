import { Article, Product } from '@commerce/types'
import { getAllTagsFromArticles } from '@components/blog/helpers'
import getAllBlogs from '@framework/blog/get-all-blogs'
import getAllProducts from '@framework/product/get-all-products'
import { getConfig, ShopifyConfig } from '../api'
import getCategories, { Category } from '../utils/get-categories'
import getVendors, { Brands } from '../utils/get-vendors'


export type GetSiteInfoResult<
  T extends { categories: any[]; brands: any[] } = {
    categories: Category[]
    articles: Article[]
    products: Product[]
    tags: string[]
    brands: Brands,
    email?:string
phone?:string
customerCareHours?:string
location?:string
  }
> = T

const getSiteInfo = async (options?: {
  variables?: any
  config: ShopifyConfig
  preview?: boolean
}): Promise<GetSiteInfoResult> => {
  let { config } = options ?? {}

  config = getConfig(config)

  const categories = await getCategories(config)
  const brands = await getVendors(config)
  const { articles } = await getAllBlogs({
    config,
  })

  const { products } = await getAllProducts({
    config,
  })
  return {
    categories,
    tags:getAllTagsFromArticles(articles),
    brands,
    articles,
    products,


  }
}

export default getSiteInfo
