import { Product } from '@commerce/types'
import { Gallery } from '@components/common'
import classNames from 'classnames'
import Image from 'next/image'
import React, { useState } from 'react'
import ImageSlider from './ImageSlider'

export const ProductImages = ({
  product,
  width,
  height,
}: {
  product: Product
  width: number
  height: number
}) => {
  const [open, setOpen] = useState<boolean>()
  const [index, setIndex] = useState<number>(0)
  const handleOpenGallery = (index: number) => {
    setOpen(true)
    setIndex(index)
  }
  let ratio = height / width
  const paddingTop = `${ratio * 100}%`
  return (
    <div className="w-full relative">
      {open && (
        <Gallery
          images={product.images}
          onClose={() => setOpen(false)}
          index={index}
        />
      )}
      <div className="w-full h-full top-0 left-0 hidden lg:flex">
        <div className="w-1/6 flex flex-col z-10">
          {new Array(5).fill(product.images).map((arr, i) => {
            const image = arr[i]
            if (image) {
              return (
                <div
                  key={i}
                  className="group pr-responsive-md pb-responsive-md lg:pr-5 lg:pb-5"
                >
                  <div
                    onClick={() => {
                      setIndex(i)
                    }}
                    className={classNames(
                      'w-full  flex relative border group-hover:shadow-outline-normal ',
                      { 'border border-black': i === index }
                    )}
                  >
                    <div
                      style={{
                        paddingTop,
                      }}
                    />
                    <div className="absolute inset-0">
                      <Image
                        layout="fill"
                        className="border border-accents-2"
                        src={image.url!}
                        sizes="(max-width: 400px) 100px,200px"
                        alt={image.alt || 'Product Image'}
                        objectFit="cover"
                        priority={i === 0}
                        quality="85"
                      />
                    </div>
                  </div>

                  <div
                    onClick={() => {
                      handleOpenGallery(i)
                    }}
                    className="hidden group-hover:block  right-0 top-0 absolute w-5/6"
                  >
                    <div
                      className="w-full"
                      style={{
                        paddingTop,
                      }}
                    >
                      <div className="absolute top-0 right-0 w-full h-full flex-1">
                        <Image
                          layout="responsive"
                          src={image.url!}
                          alt={image.alt || 'Product Image'}
                          sizes="(max-width: 400px) 300px, 800px"
                          width={width}
                          height={height}
                          priority={i === 0}
                          quality="85"
                          objectFit="cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
            return <div key={i} className="flex-1" />
          })}
        </div>
        <div className="w-5/6 bg-accents-0">
          <div
            onClick={() => {
              handleOpenGallery(0)
            }}
            className="w-full flex-1 relative"
            style={{ paddingTop }}
          >
            <div className="flex-1 absolute top-0 right-0 w-full h-full bg-accents-1">
              <Image
                layout="responsive"
                src={product.images[index]?.url!}
                alt={product.images[index]?.alt || 'Product Image'}
                width={width}
                height={height}
                sizes="(max-width: 400px) 300px, 800px"
                quality="85"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          paddingTop,
        }}
        className="w-full h-full lg:hidden flex relative"
      >
        <div className="absolute inset-0">
          <ImageSlider>
            {Array.from(product.images, (image, i) => (
              <div
                key={i}
                className="w-full relative"
                onClick={() => {
                  handleOpenGallery(i)
                }}
                style={{
                  paddingTop,
                }}
              >
                <div className="absolute inset-0">
                  <Image
                    layout="responsive"
                    src={image.url!}
                    alt={image.alt || 'Product Image'}
                    sizes="(max-width: 400px) 300px, 800px"
                    width={width}
                    height={height}
                    priority={i === 0}
                    quality="85"
                    objectFit="cover"
                  />
                </div>
              </div>
            ))}
          </ImageSlider>
        </div>
      </div>
    </div>
  )
}
export default ProductImages
