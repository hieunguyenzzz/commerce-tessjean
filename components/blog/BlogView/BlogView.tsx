import { Article } from '@commerce/types'
import { Breadcrumb } from '@components/common'
import { Facebook, Pinterest, Twitter } from '@components/icons'
import { placeholderImg } from '@components/product/helpers'
import { Container, Text } from '@components/ui'
import { formatdate } from '@lib/datetime'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { getLink } from '../helpers'
interface Props {
  articles: Article[]
  article: Article
  title?: string
}
const createFacebookShareUrl = (url: string) =>
  `https://www.facebook.com/sharer.php?u=${url}`
const createTwitterShareUrl = (url: string) =>
  `https://twitter.com/share?url=${url}`
const createPinterestShareUrl = (url: string) =>
  `https://pinterest.com/pin/create/button/?url=${url}`

const BlogView: React.FC<Props> = ({
  article,
  articles,
  title = 'JOURNAL',
}) => {
  const { locale, isReady } = useRouter()
  return (
    <>
      <Container className="pt-md mb-6">
        <Breadcrumb>
          <Link href={`/blog/journal`}>{title}</Link>
          {'/ '}
          {article.tags[0] ? (
            <Link href={`/blog/journal/${article.tags[0]}`}>
              {article.tags[0]}
            </Link>
          ) : (
            <Link href={`/blog/journal`}>all</Link>
          )}
        </Breadcrumb>
      </Container>
      <div className="max-w-2xl mx-auto">
        <Container data-testid="BlogView">
          <div className="prose">
            <Text variant="h2">{article.name}</Text>
            <div
              className="w-full"
              dangerouslySetInnerHTML={{ __html: article.contentHtml }}
            ></div>
          </div>
          {isReady && (
            <div className="space-y-sm lg:space-y-4">
              <div className="font-bold">Share</div>
              <div className="space-x-6 flex text-2xl">
                <a
                  href={createFacebookShareUrl(window.location.href)}
                  target="_blank"
                  rel="noopener"
                  className="rounded hover-effect-1 bg-facebook text-white p-2"
                >
                  <Facebook />
                </a>
                <a
                  href={createTwitterShareUrl(window.location.href)}
                  target="_blank"
                  rel="noopener"
                  className="rounded hover-effect-1 bg-twitter text-white p-2"
                >
                  <Twitter />
                </a>
                <a
                  href={createPinterestShareUrl(window.location.href)}
                  target="_blank"
                  rel="noopener"
                  className="rounded hover-effect-1 bg-pinterest text-white p-2"
                >
                  <Pinterest />
                </a>
              </div>
            </div>
          )}
        </Container>
      </div>

      <div className="py-24  mt-12 bg-accents-1">
        <Container>
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12">
            {new Array(2).fill(articles).map((articles, i: number) => {
              const article = articles[i]
              if (!article) return null
              return (
                <Link key={article.slug} href={getLink(article.slug)}>
                  <a>
                    <Image
                      className="bg-accents-1"
                      layout="responsive"
                      objectFit="cover"
                      src={article.image?.url || placeholderImg}
                      width={630}
                      height={369}
                    ></Image>
                    <div className="p-5 space-y-1 text-center">
                      <h2 className="header-1 uppercase">
                        {(article as any).name as any}
                      </h2>
                      <Text variant="subtitle">
                        {formatdate(article.publishedAt, locale, 'long')}
                      </Text>
                    </div>
                  </a>
                </Link>
              )
            })}
          </div>
        </Container>
      </div>
    </>
  )
}
export default BlogView
