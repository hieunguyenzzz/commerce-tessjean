import { Article } from '@commerce/types'
import { BlogListView, BlogSidebar } from '@components/blog'
import { getAllTagsFromArticles } from '@components/blog/helpers'
import { Layout } from '@components/common'
import { Logo, NavbarRoot } from '@components/common/Navbar'
import { Container } from '@components/ui'
import { getConfig } from '@framework/api'
import getAllJournal from '@framework/blog/get-all-journal'
import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import { useRouter } from 'next/router'
export async function getStaticProps({
  params,
  preview,
  locale,
}: GetStaticPropsContext) {
  const slug = (params?.slug || '') as string
  const config = getConfig({ locale })
  const { articles = [] } = await getAllJournal({ config, preview })
  const tags = getAllTagsFromArticles(articles)
  return {
    props: {
      articles,
      slug,
      tags,
    },
  }
}
export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
interface WhatBlog {
  currentTag?: string
  articles: Article[]
  tags?: string[]
}
function WhatBlog({ currentTag, articles, tags }: WhatBlog) {
  const router = useRouter()
  const currentPage = Number(router.query?.page || 1)
  const limit = 6
  const pageTotal = Math.ceil(articles.length / limit)
  const fromIndex = (currentPage - 1) * limit
  const ToIndex = fromIndex + limit
  const showArticles = articles.filter((_, i) => i >= fromIndex && i < ToIndex)
  return (
    <BlogListView
      articles={showArticles}
      tags={tags}
      currentTag={currentTag}
      pageTotal={pageTotal}
      currentPage={currentPage}
    />
  )
}
export default function Blog({
  slug,
  articles,
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { query } = useRouter()
  const currentTag = query.slug
  const showarticles = articles.filter(
    (article) =>
      article.tags &&
      article.tags.find(
        (item) => item.toLowerCase() === String(currentTag).toLowerCase()
      )
  )

  return (
    <>
      <WhatBlog
        articles={showarticles}
        tags={tags}
        currentTag={currentTag ? String(currentTag) : undefined}
      />
      <BlogSidebar
        {...{
          currentTag: String(currentTag),
          tags: [
            'INSPIRING WOMEN',
            'BEHIND TESS JEAN',
            'EDITIORIALS',
            'LIFESTYLE',
          ],
        }}
      />
    </>
  )
}

Blog.Layout = Layout
Blog.renderNavbar = () => (
  <NavbarRoot>
    <Container className="flex justify-center items-center">
      <Logo />
    </Container>
  </NavbarRoot>
)
