import { Layout } from '@components/common'
import CustomercareLayout from '@components/sections/customer-care/Layout'
import { getConfig } from '@framework/api'
import getArticle from '@framework/blog/get-article'
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import React from 'react'

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const config = getConfig({ locale })
  const { article } = await getArticle({
    config,
    variables: { query: 'tag:customercare/ethics' },
  })
  return {
    props: {
      article,
    },
    revalidate: 14400,
  }
}

export default function Ethics({
  article,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <CustomercareLayout title="ethics" activeslug="ethics">
      <div
        className="whitespace-pre-line"
        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
      ></div>
    </CustomercareLayout>
  )
}
Ethics.Layout = Layout
