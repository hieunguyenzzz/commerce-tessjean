import { CollectionSidebar, CollectionView } from '@components/collection'
import { Layout, Navbar } from '@components/common'
import { CATEGORIES } from '@components/product/helpers'
import { getConfig } from '@framework/api'
import getAllPages from '@framework/common/get-all-pages'
import getAllCollections from '@framework/product/get-all-collections'
import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import { useRouter } from 'next/router'
import React from 'react'

export async function getStaticProps({
  params,
  locale,
  preview,
}: GetStaticPropsContext<{ slug: string }>) {
  const config = getConfig({ locale })
  const { categories } = await getAllCollections({ config })
  const { pages } = await getAllPages({ config, preview })
  const collection = categories.find((item: any) => item.slug === params?.slug)
  if (!collection) {
    throw new Error(`collection with slug '${params!.slug}' not found`)
  }
  const { products } = collection
  return {
    props: {
      categories,
      products,
      collection,
    },
    revalidate: 200,
  }
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const { categories } = await getAllCollections()
  return {
    paths: locales
      ? locales.reduce<string[]>((arr, locale) => {
          // Add a product path for every locale
          categories.forEach((cate: any) => {
            arr.push(`/${locale}/collections/${cate.slug}`)
          })
          return arr
        }, [])
      : categories.map((cate: any) => {
          return `/collections/${cate.slug}`
        }),
    fallback: 'blocking',
  }
}
const EnchancedShopSidebar = () => {
  return <CollectionSidebar categories={CATEGORIES}></CollectionSidebar>
}
export default function Slug({
  collection,
  categories,
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  return router.isFallback ? (
    <h1>Loading...</h1> // TODO (BC) Add Skeleton Views
  ) : (
    <>
      <EnchancedShopSidebar />
      <CollectionView {...{ collection, categories, products }} />
    </>
  )
}

Slug.Layout = Layout
Slug.renderNavbar = () => <Navbar modalView="COLLECTION" />
