import { Layout, Navbar } from '@components/common'
import HomeView from '@components/sections/home/HomeView'
import { getConfig } from '@framework/api'
import getAllBlogs from '@framework/blog/get-all-blogs'
import getAllCollections from '@framework/product/get-all-collections'
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const config = getConfig({ locale })
  const { categories } = await getAllCollections({ config })
  const { articles } = await getAllBlogs({ config })
  const collection = categories.find((cate) => cate.slug === '001-softtest')
  if (!collection) {
    throw new Error(`collection not found`)
  }
  return {
    props: {
      collection,
      articles,
    },
    revalidate: 14400,
  }
}

export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  // return <ComingSoon />
  return <HomeView {...props} />
}
Home.Layout = Layout
Home.renderNavbar = () => <Navbar transparent />
