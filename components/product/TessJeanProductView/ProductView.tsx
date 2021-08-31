import { usePrice } from '@commerce/product'
import type { Product } from '@commerce/types'
import { Breadcrumb } from '@components/common'
import { SizeGuide } from '@components/icons'
import AdsSignupView from '@components/others/AdsSignup'
import { ProductSlider2, Swatch } from '@components/product'
import { Accordion, Button, Container, Text, useUI } from '@components/ui'
import { useAddItem } from '@framework/cart'
import classNames from 'classnames'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC, useState } from 'react'
import {
  getProductLink,
  getSizeRange,
  getVariant,
  placeholderImg,
  SelectedOptions,
} from '../helpers'
import ProductImages from '../ProductImages'
interface Props {
  className?: string
  children?: any
  product: Product
  relatedProducts: Product[]
}
const OptionsRow: FC<{ label: string }> = ({ label, children }) => (
  <div className="flex items-baseline">
    <h2 className="w-1/3 text-lg font-bold capitalize flex-shrink-0">
      {label}
    </h2>
    <div className="flex items-baseline flex-row flex-wrap space-y-2 space-y-reverse">
      {children}
      <div />
    </div>
  </div>
)
const ProductView: FC<Props> = ({ product, relatedProducts }) => {
  const addItem = useAddItem()
  const { openSidebar, setModalView } = useUI()
  const [loading, setLoading] = useState(false)
  const [choices, setChoices] = useState<SelectedOptions>({
    size: null,
    color: null,
  })

  const { price, currency } = usePrice({
    amount: product.price.value,
    baseAmount: 1,
    baseCurrency: product.price.currencyCode,
  })

  // Select the correct variant based on choices
  const variant = getVariant(product, choices)
  const addToCart = async () => {
    setLoading(true)
    try {
      await addItem({
        productId: String(product.id),
        variantId: String(variant ? variant.id : product.variants[0].id),
      })
      setModalView('CART')
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }
  const colorOptions = product.options?.find(
    (option) => option.displayName === 'color'
  )
  const sizeOptions = product.options?.find(
    (option) => option.displayName === 'size'
  )
  return (
    <>
      <NextSeo
        title={product.name}
        description={product.description}
        openGraph={{
          type: 'website',
          title: product.name,
          description: product.description,
          images: [
            {
              url: product.images[0]?.url!,
              width: 800,
              height: 600,
              alt: product.name,
            },
          ],
        }}
      />
      <Container className="pt-md mb-6">
        <Breadcrumb>
          <Link href="/shop">
            <a>SHOP</a>
          </Link>
          / All/ {product.name}
        </Breadcrumb>
      </Container>
      <div className="fit  space-y-2xl">
        <Container
          small
          className="grid gap-12 lg:gap-5 grid-cols-1 lg:grid-cols-12 "
        >
          <div className="lg:col-span-7 md:col-span-1">
            <ProductImages product={product} width={510} height={880} />
          </div>
          <div className="lg:col-span-5 md:col-span-1 space-y-5.5 relative">
            <div className="space-y-1">
              <Text variant="h5">{product.name}</Text>
              <div className="uppercase">
                {price} {currency}
              </div>
            </div>
            <div className="break-words w-full max-w-xl">
              <Text html={product.description} />
            </div>
            <div className="space-y-4">
              {colorOptions && (
                <div>
                  <OptionsRow label={colorOptions.displayName}>
                    {colorOptions.values.map((v, i: number) => {
                      const active = (choices as any)[colorOptions.displayName]
                      return (
                        <Swatch
                          className="flex-shrink-0"
                          key={`${colorOptions.id}-${i}`}
                          active={v.label === active}
                          variant={colorOptions.displayName}
                          color={v.hexColors ? v.hexColors[0] : ''}
                          label={v.label}
                          onClick={() => {
                            setChoices((choices) => {
                              return {
                                ...choices,
                                [colorOptions.displayName]: v.label,
                              }
                            })
                          }}
                        />
                      )
                    })}
                  </OptionsRow>
                </div>
              )}
              {sizeOptions && (
                <div>
                  <OptionsRow label={sizeOptions.displayName}>
                    {getSizeRange(product).map((v, i: number) => {
                      const active = (choices as any)[sizeOptions.displayName]
                      return (
                        <Swatch
                          className={classNames('flex-shrink-0')}
                          disabled={!v.available}
                          key={`${sizeOptions.id}-${i}`}
                          active={v.label === active}
                          variant={sizeOptions.displayName}
                          label={v.label}
                          onClick={() => {
                            setChoices((choices) => {
                              return {
                                ...choices,
                                [sizeOptions.displayName]: v.label,
                              }
                            })
                          }}
                        />
                      )
                    })}
                    <div />
                  </OptionsRow>
                  <div className="space-x-xs flex items-center mt-1">
                    <span className="text-lg">
                      <SizeGuide />
                    </span>
                    <span className="text-xxs">SIZE GUIDE</span>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col md:flex-row lg:flex-nowrap justify-between space-y-md lg:space-y-0">
              <Button
                className="order-1 px-6 text-center mt-6 lg:mt-0 w-full lg:w-0 m-0 lg:order-none flex-1  truncate"
                aria-label="Add to Cart"
                type="button"
                onClick={addToCart}
                loading={loading}
                disabled={!variant && product.options.length > 0}
              >
                Add to Cart
              </Button>
            </div>
            <div className=" mt-responsive-lg lg:mt-2xl"></div>
            <Accordion />
            <div className="h-12"></div>
          </div>
        </Container>
        <Container
          small
          className="py-6 px-0 lg:py-12 space-y-6 lg:space-y-10 overflow-hidden"
        >
          <Text variant="h4" className="text-center">
            YOU MAY ALSO LIKE
          </Text>
          <div className="min-w-[493px] md:min-w-full md:w-full ml-[-16px] md:mx-[-8px]">
            <ProductSlider2>
              {relatedProducts.map((product, i) => {
                return (
                  <Link href={getProductLink(product.slug)} key={i}>
                    <a className="pl-[16px] md:px-[8px] block">
                      <div className="flex relative items-center w-full bg-gray-100">
                        <div style={{ paddingTop: (223 / 157) * 100 + '%' }} />
                        <Image
                          layout="fill"
                          objectFit="cover"
                          quality="85"
                          sizes="(max-width: 400px) 200px ,500px"
                          src={product.images[0].url || placeholderImg}
                          alt={product.name || 'Product Image'}
                        />
                      </div>
                    </a>
                  </Link>
                )
              })}
              <div className="md:hidden" />
            </ProductSlider2>
          </div>
        </Container>
      </div>
      <Container small>
        <div className="h-12 md:h-24"></div>
        <AdsSignupView />
        <div className="h-12 md:h-24"></div>
      </Container>
    </>
  )
}

export default ProductView
