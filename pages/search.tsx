import { Breadcrumb, Layout, Navbar } from '@components/common'
import AdsSignupView from '@components/others/AdsSignup'
import { SearchView } from '@components/product'
import { Container } from '@components/ui'
import { getConfig } from '@framework/api'
import getAllPages from '@framework/common/get-all-pages'
import getSiteInfo from '@framework/common/get-site-info'
import getAllCollections from '@framework/product/get-all-collections'
// TODO(bc) Remove this. This should come from the API
import getSlug from '@lib/get-slug'
import { useSearchMeta } from '@lib/search'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })
  const { pages } = await getAllPages({ config, preview })
  const { categories: collections } = await getAllCollections({
    config,
    preview,
  })

  const { categories, tags, brands, articles, products } = await getSiteInfo({
    config,
    preview,
  })
  return {
    props: {
      pages,
      collections,
      categories,
      tags,
      articles,
      products,
    },
  }
}
export default function Search({
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const { asPath } = router
  // `q` can be included but because categories and designers can't be searched
  // in the same way of products, it's better to ignore the search input if one
  // of those is selected

  const { category } = useSearchMeta(asPath)
  const activeCategory = categories.find(
    (cat) => getSlug(cat.path) === category
  )

  return (
    <>
      <Container className="pt-md mb-6">
        <Breadcrumb>SHOP/ {activeCategory?.name || 'all'}</Breadcrumb>
      </Container>
      <Container>
        <SearchView activeCategory={activeCategory} categories={categories} />
      </Container>
      <Container small>
        <div className="h-24"></div>
        <AdsSignupView />
        <div className="h-24"></div>
      </Container>
    </>
  )
}

Search.Layout = Layout
Search.renderNavbar = () => <Navbar modalView="SEARCH" />
