import { Layout } from '@components/common'
import CustomercareLayout from '@components/sections/customer-care/Layout'
import { Accordion } from '@components/ui'
import { getConfig } from '@framework/api'
import getArticle from '@framework/blog/get-article'
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import React from 'react'

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const config = getConfig({ locale })
  const { article, articles } = await getArticle({
    config,
    variables: { query: 'tag:customercare/shipping' },
  })
  return {
    props: {
      article,
      articles,
    },
    revalidate: 14400,
  }
}

export default function Shipping({
  article,
  articles,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [_, ...rows] = articles
  return (
    <CustomercareLayout title="shipping" activeslug="shipping">
      <div className="flex flex-col space-y-md">
        <Accordion
          data={rows.map((article) => {
            return {
              title: <span className="uppercase">{article.name}</span>,
              children: (
                <div
                  className="pt-2"
                  dangerouslySetInnerHTML={{ __html: article.contentHtml }}
                ></div>
              ),
            }
          })}
        />
      </div>
    </CustomercareLayout>
  )
}
Shipping.Layout = Layout
