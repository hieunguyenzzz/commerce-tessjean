import ShopSidebar from '@components/blog/ShopSidebar'
import { Layout, Navbar } from '@components/common'
import { ProductView } from '@components/product'
import { CATEGORIES } from '@components/product/helpers'
import { getConfig } from '@framework/api'
import getAllPages from '@framework/common/get-all-pages'
import getAllProducts from '@framework/product/get-all-products'
import getProduct from '@framework/product/get-product'
import { getSearchVariables } from '@framework/utils'
import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import { useRouter } from 'next/router'

export async function getStaticProps({
  params,
  locale,
  preview,
}: GetStaticPropsContext<{ slug: string }>) {
  const config = getConfig({ locale })
  const { pages } = await getAllPages({ config, preview })
  const { product } = await getProduct({
    variables: { slug: params!.slug },
    config,
    preview,
  })
  const { products } = await getAllProducts({
    variables: {
      first: 12,
      ...(product?.tags
        ? getSearchVariables({ search: product?.tags[0] })
        : {}),
    },
    config,
    preview,
  })
  if (!product) {
    throw new Error(`Product with slug '${params!.slug}' not found`)
  }

  return {
    props: {
      pages,
      product,
      relatedProducts: products,
    },
    revalidate: 200,
  }
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  return {
    paths: [],
    fallback: true,
  }
  // const { products } = await getAllProductPaths()
  // return {
  //   paths: locales
  //     ? locales.reduce<string[]>((arr, locale) => {
  //         // Add a product path for every locale
  //         products.forEach((product) => {
  //           arr.push(`/${locale}/product${product.node.path}`)
  //         })
  //         return arr
  //       }, [])
  //     : products.map((product) => `/product${product.node.path}`),
  //   fallback: 'blocking',
  // }
}
const EnchancedShopSidebar = () => {
  return <ShopSidebar categories={CATEGORIES}></ShopSidebar>
}
export default function Slug({
  product,
  relatedProducts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  return router.isFallback ? (
    <h1>Loading...</h1> // TODO (BC) Add Skeleton Views
  ) : (
    <>
      <EnchancedShopSidebar />
      <ProductView
        key={product?.slug}
        product={product as any}
        relatedProducts={relatedProducts}
      />
    </>
  )
}

Slug.Layout = Layout
Slug.renderNavbar = () => <Navbar modalView="SHOP" />
