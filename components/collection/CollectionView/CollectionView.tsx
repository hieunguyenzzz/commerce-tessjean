import type { Collection, Product } from '@commerce/types'
import AdsSignupView from '@components/others/AdsSignup'
import { Button, Container } from '@components/ui'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'
import s from './CollectionView.module.css'
interface Props {
  children?: any
  collection: Collection
  categories: Collection[]
  products: Product[]
}

const CollectionView: FC<Props> = ({ collection, categories, products }) => {
  return (
    <>
      <div className={classNames(s.root, 'collection')}>
        <style>
          {`
              .collection{
                text-align:center;
              }
              .collection iframe{
                width: 100vw;
                height: 48.8vw;
              }
              .collection p{
                max-width:64ch;
                margin:auto;
                padding-left:1.2rem;
                padding-right:1.2rem
              }
              .collection h1{
                font-size:24px;
                padding:25px;
              }
              .collection .description{
                font-size:14px;
              }
              .collection .credit{
                font-size:12px
              }
          `}
        </style>
        <div
          dangerouslySetInnerHTML={{ __html: collection.descriptionHtml }}
        ></div>
      </div>
      <div className="space-y-[33px] mt-[33px]">
        <Container className="flex space-x-2">
          <div className="flex-1 bg-accents-1">
            <Image
              objectFit="cover"
              width="168"
              height="256"
              layout="responsive"
              src="/blog-1.jpg"
            />
          </div>
          <div className="flex-1 bg-accents-1">
            <Image
              objectFit="cover"
              width="168"
              height="256"
              layout="responsive"
              src="/blog-2.jpg"
            />
          </div>
        </Container>
        <div className="w-full">
          <Image
            objectFit="cover"
            width="375"
            height="231"
            layout="responsive"
            src="/blog-3.jpg"
          />
        </div>
        <Container className="w-full">
          <Image
            objectFit="cover"
            width="375"
            height="231"
            layout="responsive"
            src="/blog-4.png"
          />
        </Container>
        <div className="w-full">
          <Image
            objectFit="cover"
            width="375"
            height="231"
            layout="responsive"
            src="/blog-5.png"
          />
        </div>
        <div className="w-full">
          <Image
            objectFit="cover"
            width="375"
            height="231"
            layout="responsive"
            src="/blog-6.png"
          />
        </div>
        <Container className="flex space-x-2">
          <div className="flex-1 bg-accents-1">
            <Image
              objectFit="cover"
              width="168"
              height="256"
              layout="responsive"
              src="/blog-1.jpg"
            />
          </div>
          <div className="flex-1 bg-accents-1">
            <Image
              objectFit="cover"
              width="168"
              height="256"
              layout="responsive"
              src="/blog-2.jpg"
            />
          </div>
        </Container>
        <div className="flex justify-center">
          <Link href="/search/001-softtest">
            <Button>SHOP THE COLLECTION</Button>
          </Link>
        </div>
        <div className="h-4" />
        <div
          className="relative"
          style={{ paddingTop: `${Math.floor((211 / 375) * 100)}%` }}
        >
          <div className="absolute inset-0">
            <Image objectFit="cover" layout="fill" src={'/campaign-9.jpeg'} />
          </div>
        </div>
        <Container small>
          <div className="h-24"></div>
          <AdsSignupView />
          <div className="h-24"></div>
        </Container>
      </div>
    </>
  )
}

export default CollectionView
