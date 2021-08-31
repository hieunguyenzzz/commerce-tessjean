import type { Product } from '@commerce/types'
import { ActionButton } from '@components/common'
import { Bag, Heart, Plus } from '@components/icons'
import Image, { ImageProps } from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

const placeholderImg = '/product-img-placeholder.svg'

interface LabelProps {
  variant?: 'default' | 'out-of-stock' | 'discount'
  text: string
  position?: string
}
interface Props {
  className?: string
  product: Product
  variant?: 'slim' | 'simple'
  size?: 'small' | 'large'
  label?: LabelProps
  imgProps?: Omit<ImageProps, 'src'>
}

const Label: FC<LabelProps> = ({ variant = 'default', text }) => {
  if (variant === 'out-of-stock')
    return (
      <div className="py-1 px-4 bg-black text-white absolute top-4 right-4">
        {text}
      </div>
    )
  if (variant === 'discount')
    return (
      <div className="py-1 px-4  text-white absolute top-4 right-4">{text}</div>
    )
  if (variant === 'default')
    return (
      <div className="py-1 px-4 bg-black text-white absolute top-4 right-4">
        {text}
      </div>
    )
  return null
}
const ProductCard: FC<Props> = ({
  className,
  product,
  variant,
  imgProps,
  label,
  size,
  ...props
}) => (
  <div {...props}>
    <div className="group w-full h-full flex flex-col items-center space-y-md text-center">
      <div className="flex relative items-center w-full bg-gray-100">
        <div style={{ paddingTop: '100%', width: '100%' }} />
        <Image
          layout="fill"
          objectFit="cover"
          quality="85"
          src={product.images[0].url || placeholderImg}
          alt={product.name || 'Product Image'}
        />
        <div className="hidden md:flex justify-center items-center space-x-3 group-hover:bg-opacity-50 bg-opacity-0 transition-colors duration-700 bg-gray-200 absolute left-0 top-0 w-full h-full">
          <ActionButton
            size={size}
            tooltip="Quick view"
            className=" flex-shrink-0 transform translate-y-8 group-hover:translate-y-0  opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-200 delay-100 hover:text-primary"
          >
            <Plus />
          </ActionButton>
          <ActionButton
            size={size}
            tooltip="Add to cart"
            className=" flex-shrink-0 transform translate-y-8 group-hover:translate-y-0  opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-500 delay-100 hover:text-primary"
          >
            <Bag />
          </ActionButton>
          <ActionButton
            size={size}
            tooltip="Browse Wishlist"
            className=" flex-shrink-0 transform translate-y-8 group-hover:translate-y-0  opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-700 delay-100 hover:text-primary"
          >
            <Heart />
          </ActionButton>
        </div>
        {label && <Label {...label} />}
      </div>
      <Link href={`/product/${product.slug}`}>
        <h2 className="font-semibold text-xl">{product.name}</h2>
      </Link>
      <div className="text-accents-5">
        <span>{product.price.value}</span>{' '}
        <span>{product.price.currencyCode}</span>
      </div>
    </div>
  </div>
)

export default ProductCard
