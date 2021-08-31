import { usePrice } from '@commerce/product'
import { Article, Collection, Product } from '@commerce/types'
import AdsSignupView from '@components/others/AdsSignup'
import { ProductSlider2 } from '@components/product'
import { getProductLink, placeholderImg } from '@components/product/helpers'
import { Button, Container } from '@components/ui'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import s from './HomeView.module.css'

const ProductItem: React.FC<{ product: Product }> = ({ product }) => {
  const { price, currency } = usePrice({
    amount: product.price.value,
  })
  return (
    <div className="flex relative items-center w-full bg-gray-100 group">
      <div style={{ paddingTop: (297 / 200) * 100 + '%' }} />
      <Image
        layout="fill"
        objectFit="cover"
        quality="85"
        sizes="(max-width: 400px) 200px ,500px"
        src={product.images[0].url || placeholderImg}
        alt={product.name || 'Product Image'}
      />
      <div className="absolute py-4 bottom-0">
        <div className="px-4 text-[14px]  uppercase mt-[10px]">
          {product.name}
        </div>
        <div className="px-4 text-[14px] uppercase mt-[2px]  mb-0 transform opacity-0  group-hover:opacity-100 group-hover:scale-100 group-hover:mb-[19px] transition-all duration-300 ease-in-out">
          {currency} {price}
        </div>
      </div>
    </div>
  )
}
const HomeView: React.FC<{
  instagramPosts?: any[]
  collection: Collection
  articles: Article[]
}> = ({ collection, articles, instagramPosts }) => {
  // useEffect(() => {
  //   fetch('https://cdn.shopify.com/s/javascripts/currencies.js')
  //     .then((res) => {
  //       console.log({ res })
  //       return res.json()
  //     })
  //     .then(console.log)
  //   return () => {}
  // }, [])
  return (
    <div
      className={classNames(s.root, 'space-y-[17px]')}
      data-testid="HomeView"
    >
      <div className="relative lg:h-screen flex items-center justify-center py-[60px] pt-[120px] px-[50px] w-full">
        <div className="absolute inset-0 ">
          <Image
            objectPosition="top right"
            layout="fill"
            objectFit="cover"
            src="/home_cover.jpeg"
          />
        </div>
        <div className="text-center mx-auto  isolate flex flex-col items-center w-full space-y-[12px] text-white max-w-3xl">
          <div className="uppercase text-[12px] lg:text-[14px]">
            JUST LANDED
          </div>
          <div className="uppercase text-[20px] leading-[24px] lg:text-[48px] lg:leading-[57px]">
            fLEUR STORY: HAND PAINTED IN HOUSE EMBRACE SUMMER FLORALS
          </div>
          <Link href={'/search/' + collection.slug}>
            <Button variant="ghost" small className="inline-block">
              <span className="text-white">VIEW THE COLLECTION</span>
            </Button>
          </Link>
        </div>
      </div>
      <Container className="py-6 px-0 lg:py-12 space-y-6 lg:space-y-10 overflow-hidden">
        <div className="min-w-[493px] md:min-w-full md:w-full ml-[-16px] md:mx-0">
          <ProductSlider2 showNavigationButoon={false} slidesPerView={2}>
            {new Array(4).fill(collection?.products).map((products, i) => {
              if (!products) return null
              const product = products[i]
              if (!product) return null
              return (
                <Link href={getProductLink(product.slug)} key={i}>
                  <a className="pl-[16px] md:px-[8px] block cursor-pointer ">
                    <ProductItem {...{ product }} />
                  </a>
                </Link>
              )
            })}
            <div className="md:hidden" />
          </ProductSlider2>
        </div>
      </Container>
      <Container small className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
        <div className="lg:col-span-7 order-2 lg:colsa relative flex justify-end p-lg pl-[30%]">
          <div className="w-full">
            <Image
              objectFit="cover"
              layout="responsive"
              width="210"
              height="296"
              src="/campaign-1.jpeg"
            ></Image>
          </div>
          <div className="absolute bottom-0 left-0 w-[48%] pl-lg">
            <Image
              objectFit="cover"
              layout="responsive"
              width="138"
              height="203"
              src="/campaign-2.jpeg"
            ></Image>
          </div>
        </div>
        <div className="lg:col-span-5 order-2 lg:order-1 lg:py-2xl">
          <div className="max-w-xs">
            <div className="text-[12px] leading-[14.6px] lg:text-[14px] lg-leading-[17px]">
              SUBTITLE
            </div>
            <div className="text-[24px] leading-[29px] mt-[6px] lg:text-[32px] lg-leading-[38px]">
              HEADLINES
            </div>
            <div className="text-[14px] lg:text-[16px] mt-[20px]">
              A story of exploration, slowing time, nurturing nature and growing
              up looking to the future, while being informed by the past. View
              and shop the campaign.
            </div>
          </div>
          <Link href="/collections/001-softtest">
            <Button className="inline-block mt-[20px]">
              VIEW THE COLLECTION
            </Button>
          </Link>
        </div>
        <div className="lg:col-span-12 order-2 py-xl flex flex-col lg:grid grid-cols-9 grid-rows-2 lg:gap-5">
          <div className="w-full pr-[20%] row-start-1 row-end-1 lg:col-start-1 lg:col-end-6 lg:pr-0">
            <Image
              objectFit="cover"
              layout="responsive"
              width="272"
              height="196"
              src="/feature-1.jpeg"
            ></Image>
            <div className="text-[14px] font-bold uppercase mt-[10px]">
              title
            </div>
            <div className="text-[12px] uppercase mt-[2px] mb-[10px]">
              shop now
            </div>
          </div>
          <div className="w-full pl-[43%] row-start-1 row-end-3 lg:col-start-6 lg:col-end-10 lg:pl-0 lg:mt-[108px]">
            <Image
              objectFit="cover"
              layout="responsive"
              width="204"
              height="283"
              src="/feature-2.jpeg"
            ></Image>
            <div className="text-[14px] font-bold uppercase mt-[10px]">
              title
            </div>
            <div className="text-[12px] uppercase mt-[2px] mb-[10px]">
              shop now
            </div>
          </div>
          <div className="w-full pr-[27%] mt-[36px] row-start-2 lg:col-start-1 lg:col-end-6 lg:pl-[27%] lg:pr-0 lg:mt-0">
            <Image
              objectFit="cover"
              layout="responsive"
              width="252"
              height="225"
              src="/feature-3.jpeg"
            ></Image>
            <div className="text-[14px] font-bold uppercase mt-[10px]">
              title
            </div>
            <div className="text-[12px] underline uppercase mt-[2px] mb-[10px]">
              shop now
            </div>
          </div>
        </div>
      </Container>
      <Container className="py-6 px-0 lg:py-12 space-y-[28px] lg:space-y-10 overflow-hidden">
        <h3 className="text-[24px] text-center">JOURNAL</h3>
        <div className="min-w-[600px] md:min-w-full md:w-full md:mx-[-8px]">
          <ProductSlider2
            showNavigationButoon={false}
            slidesPerView={2}
            breakpoints={{}}
          >
            {new Array(2).fill(articles).map((articles, i) => {
              const article = articles[i]
              if (!article) return null
              return (
                <Link href={`/blog/journal/${article.slug}`} key={i}>
                  <a className=" md:mx-[8px] block ">
                    <div className="flex relative items-center w-full bg-gray-100">
                      <div style={{ paddingTop: (165 / 267) * 100 + '%' }} />
                      <Image
                        layout="fill"
                        objectFit="cover"
                        quality="85"
                        sizes="(max-width: 400px) 200px ,500px"
                        src={article?.image?.url || placeholderImg}
                        alt={'Blog Image'}
                      />
                      <div className="absolute text-center inset-0 flex flex-col justify-center items-center ">
                        <div className="w-[60%] mx-auto max-w-xs text-white">
                          <h3 className="text-[16px] inline-block lg:text-[24px] lg:leading-[29px]">
                            {article?.name}
                          </h3>
                          <Button
                            className="mt-[13px] block w-full"
                            variant="ghost"
                            small
                          >
                            <span className="text-white">read more</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              )
            })}
            <div className="md:hidden" />
          </ProductSlider2>
        </div>
      </Container>
      {/* {instagramPosts && (
      <Container className="py-6 px-0 lg:py-12 space-y-[28px] lg:space-y-10 overflow-hidden">
        <h3 className="text-[24px] text-center">FOLLOW US @_TESSJEAN_</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-md">
          {instagramPosts.map((post: any, i) => (
            <div
              key={i}
              className="flex relative items-center w-full bg-gray-100 border border-transparent hover:border-accents-5"
            >
              <div style={{ paddingTop: (297 / 200) * 100 + '%' }} />
              <img
                className="absolute inset-0 object-cover"
                src={post?.display_resources[0].src || placeholderImg}
                alt={'instagram Image'}
              />
            </div>
          ))}
        </div>
      </Container>
    )} */}
      <Container small>
        <div className="h-24"></div>
        <AdsSignupView />
        <div className="h-24"></div>
      </Container>
    </div>
  )
}
export default HomeView
