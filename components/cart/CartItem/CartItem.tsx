import { Close, Minus, Plus } from '@components/icons'
import { useUI } from '@components/ui/context'
import useRemoveItem from '@framework/cart/use-remove-item'
import useUpdateItem from '@framework/cart/use-update-item'
import usePrice from '@framework/product/use-price'
import type { LineItem } from '@framework/types'
import { default as classNames, default as cn } from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { ChangeEvent, useEffect, useState } from 'react'
import s from './CartItem.module.css'

type ItemOption = {
  name: string
  nameId: number
  value: string
  valueId: number
}

const CartItem = ({
  item,
  currencyCode,
  ...rest
}: {
  item: LineItem
  currencyCode: string
}) => {
  const { closeSidebarIfPresent } = useUI()

  const { price } = usePrice({
    amount: item.variant.price * item.quantity,
    baseAmount: item.variant.listPrice * item.quantity,
    currencyCode,
  })

  const updateItem = useUpdateItem({ item })
  const removeItem = useRemoveItem()
  const [quantity, setQuantity] = useState(item.quantity)
  const [removing, setRemoving] = useState(false)

  const updateQuantity = async (val: number) => {
    await updateItem({ quantity: val })
  }

  const handleQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value)

    if (Number.isInteger(val) && val >= 0) {
      setQuantity(Number(e.target.value))
    }
  }
  const handleBlur = () => {
    const val = Number(quantity)

    if (val !== item.quantity) {
      updateQuantity(val)
    }
  }
  const increaseQuantity = (n = 1) => {
    const val = Number(quantity) + n

    if (Number.isInteger(val) && val >= 0) {
      setQuantity(val)
      updateQuantity(val)
    }
  }
  const handleRemove = async () => {
    setRemoving(true)

    try {
      // If this action succeeds then there's no need to do `setRemoving(true)`
      // because the component will be removed from the view
      await removeItem(item)
    } catch (error) {
      setRemoving(false)
    }
  }
  // TODO: Add a type for this
  const options = (item as any).options

  useEffect(() => {
    // Reset the quantity state if the item quantity changes
    if (item.quantity !== Number(quantity)) {
      setQuantity(item.quantity)
    }
  }, [item.quantity])

  return (
    <li
      className={cn('flex flex-row space-x-5 py-md lg:py-12', {
        'opacity-75 pointer-events-none': removing,
      })}
      {...rest}
    >
      <Link href={`/product/${item.path}`}>
        <a className="relative flex overflow-hidden cursor-pointer w-[89px] lg:w-2/6 max-w-[160px]">
          <Image
            onClick={() => closeSidebarIfPresent()}
            className={cn(s.productImage, 'block')}
            width={160}
            height={244}
            objectPosition="top center"
            objectFit="cover"
            src={item.variant.image!.url}
            alt={item.variant.image!.altText}
            unoptimized
          />
        </a>
      </Link>
      <div className="flex-1 flex flex-col text-base">
        <Link href={`/product/${item.path}`}>
          <span
            className="font-bold text-[14px] md:text-base cursor-pointer leading-6 uppercase"
            onClick={() => closeSidebarIfPresent()}
          >
            {item.name}
          </span>
        </Link>
        {((options) => {
          return options
        })(options) && options.length > 0 ? (
          <div className="">
            {options.map((option: ItemOption, i: number) => (
              <span
                key={`${item.id}-${option.name}`}
                className="text-sm font-semibold text-accents-7"
              >
                {option.value}
                {i === options.length - 1 ? '' : ', '}
              </span>
            ))}
          </div>
        ) : null}
        <div className="flex-1" />
        <div className="flex">
          <div className="flex  items-center mt-3 border border-black focus-within:shadow-outline-normal">
            <button
              className="p-xs"
              type="button"
              onClick={() => increaseQuantity(-1)}
            >
              <Minus width={11} height={11} />
            </button>
            <label>
              <input
                type="number"
                max={99}
                min={0}
                className={classNames(
                  s.quantity,
                  'appearance-none border-none focus:outline-none'
                )}
                value={quantity}
                onChange={handleQuantity}
                onBlur={handleBlur}
              />
            </label>
            <button
              className="p-xs"
              type="button"
              onClick={() => increaseQuantity(1)}
            >
              <Plus width={11} height={11} />
            </button>
          </div>
        </div>
      </div>
      <div className="flex text-right flex-col justify-between space-y-2 text-base pt-1">
        <button
          className="flex font-montserrat justify-end outline-none text-[12px] uppercase text-accents-5 space-x-2 leading-none font-semibold"
          onClick={handleRemove}
        >
          <div>
            <Close />
          </div>{' '}
          <div>remove</div>
        </button>
        <span>{price}</span>
      </div>
    </li>
  )
}

export default CartItem
