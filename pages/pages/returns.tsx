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
    variables: { query: 'tag:customercare/returns' },
  })
  return {
    props: {
      article,
      articles,
    },
    revalidate: 14400,
  }
}

export default function Returns({
  article,
  articles,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [_, ...rows] = articles
  return (
    <CustomercareLayout title="returns" activeslug="returns">
      <div className="grid grid-cols-2 lg:grid-cols-4 lg:px-[2px] border border-white gap-px relative">
        <div className="absolute inset-px bg-black "></div>
        <div className="flex-1 isolate p-4 px-xs lg:py-0 bg-white flex flex-col items-center">
          <div className="w-[51px] h-[51px] flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={51}
              height={51}
              viewBox="0 0 51 51"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.3289 9H41.2432C42.7451 9 43.9627 10.2176 43.9627 11.7195V33.5154H8.60938V11.7195C8.60938 10.2176 9.82693 9 11.3289 9V9Z"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.56774 44.3931H44.9985C46.5005 44.3931 47.718 43.1755 47.718 41.6736C47.718 41.2514 47.6197 40.835 47.4309 40.4574L43.9598 33.5151H8.60649L5.13536 40.4574C4.46367 41.8008 5.00818 43.4343 6.35155 44.106C6.72916 44.2948 7.14555 44.3931 7.56774 44.3931V44.3931Z"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="px-xs text-center categories mt-sm">
            Email us to let us know you are making a return
          </div>
        </div>
        <div className="flex-1 isolate p-4 px-xs lg:py-0 bg-white flex flex-col items-center">
          <div className="w-[51px] h-[51px] flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={35}
              height={41}
              viewBox="0 0 35 41"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M33.7646 34.7143V15.0476L20.1127 1H6.46076C3.44487 1 1 3.51573 1 6.61905V34.7143C1 37.8176 3.44487 40.3333 6.46076 40.3333H28.3038C31.3197 40.3333 33.7646 37.8176 33.7646 34.7143Z"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.46094 20.6667H20.1128"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.46094 26.2856H25.5736"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.46094 31.9048H14.6521"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20.1133 1V9.42857C20.1133 12.5319 22.5581 15.0476 25.574 15.0476H33.7652"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="px-xs text-center categories mt-sm">
            Fill out the Return Form included in your pakage
          </div>
        </div>
        <div className="flex-1 isolate p-4 px-xs lg:py-0 bg-white flex flex-col items-center">
          <div className="w-[51px] h-[51px] flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={38}
              height={46}
              viewBox="0 0 38 46"
              fill="none"
            >
              <path
                d="M1 12.5789L19 1L37 12.5789M1 12.5789V33.4211L19 45M1 12.5789L19 24.1579M37 12.5789V33.4211L19 45M37 12.5789L19 24.1579M19 45V24.1579M10 6.78947L28 18.3684"
                stroke="#121923"
                strokeWidth="1.2"
              />
            </svg>
          </div>

          <div className="px-xs text-center categories mt-sm">
            Pack and send your items back to our New Zealand warehouse
          </div>
        </div>
        <div className="flex-1 isolate p-4 px-xs lg:py-0 bg-white flex flex-col items-center">
          <div className="w-[51px] h-[51px] flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={37}
              height={39}
              viewBox="0 0 37 39"
              fill="none"
            >
              <path
                d="M13.8592 12.6902V1.00002H1"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.8581 0.999928C6.06469 7.63215 2.16797 14.2566 2.16797 20.8732C2.16797 27.4898 4.506 33.3349 9.18207 38.4084"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M23.2111 26.7183V38.4084H36.0703"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M23.2122 38.4085C31.0056 31.7763 34.9023 25.1519 34.9023 18.5352C34.9023 11.9186 32.5643 6.07354 27.8882 1"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="px-xs text-center categories mt-sm">
            Email us to let us know you are making a return
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-lg mt-6">
        <Accordion
          data={rows.map((article) => {
            return {
              title: <span className="uppercase">{article.name}</span>,
              children: (
                <div
                  className="py-4"
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
Returns.Layout = Layout
