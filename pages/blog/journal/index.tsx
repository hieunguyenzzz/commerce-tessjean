import { BlogListView, BlogSidebar } from '@components/blog'
import { getAllTagsFromArticles } from '@components/blog/helpers'
import { Layout } from '@components/common'
import { Logo, NavbarRoot } from '@components/common/Navbar'
import { Container } from '@components/ui'
import { getConfig } from '@framework/api'
import getAllJournal from '@framework/blog/get-all-journal'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })
  const { articles = [] } = await getAllJournal({ config, preview })
  return {
    props: {
      articles,
      tags: getAllTagsFromArticles(articles),
    },
  }
}

export default function Blog({
  articles,
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const currentPage = Number(router.query?.page || 1)
  const limit = 6
  const pageTotal = Math.ceil(articles.length / limit)
  const fromIndex = (currentPage - 1) * limit
  const ToIndex = fromIndex + limit
  const showArticles = articles.filter((_, i) => i >= fromIndex && i < ToIndex)

  return router.isFallback ? (
    <h1>Loading...</h1> // TODO (BC) Add Skeleton Views
  ) : (
    <>
      <BlogListView
        articles={showArticles}
        tags={tags}
        pageTotal={pageTotal}
        currentPage={currentPage}
      />
      <BlogSidebar
        {...{
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
