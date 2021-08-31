import { Check, Cross } from '@components/icons'
import { Button } from '@components/ui'
import useCart from '@framework/cart/use-cart'
import Link from 'next/link'
import { FC } from 'react'
import { CartItem } from '..'

const CartMenu: FC = () => {
  const { data, isLoading, isEmpty } = useCart()
  const error = null
  const success = null

  return (
    <>
      {isLoading || isEmpty ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center w-full">
          <div className="w-1/2 mx-auto text-accents-4">
            <svg
              width="100%"
              version="1.1"
              id="Capa_1"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 394.404 394.404"
            >
              <path
                d="M354.045,0c-0.081,0-0.162,0.001-0.244,0.004H75.562c-4.418,0-8,3.582-8,8v20.16l-31.44,20
			c-2.296,1.434-3.711,3.933-3.76,6.64v331.6c0,4.418,3.582,8,8,8h265.44c2.812-0.045,5.394-1.564,6.8-4l20.48-34.32h20.96
			c4.418,0,8-3.582,8-8V8.004C362.044,3.585,358.464,0.002,354.045,0z M48.362,378.484v-315.6h249.44l0.08,315.6H48.362z
			 M294.362,26.324c-3.901,1.753-5.733,6.263-4.16,10.24l4.16,10.32H67.882l12-7.6c2.289-1.469,3.675-4,3.68-6.72v-16.56h233.52
			L294.362,26.324z M345.802,340.404l-17.52-0.32c-2.841,0.017-5.46,1.54-6.88,4l-7.6,13.12V54.884
			c0.002-1.013-0.188-2.018-0.56-2.96l-5.6-14.08l38.16-17.44V340.404z"
              />
              <path
                d="M242.602,91.204h-30.24c-4.418,0-8,3.582-8,8s3.582,8,8,8h7.12v55.28c1.064,25.604-18.83,47.222-44.434,48.286
			c-25.604,1.064-47.222-18.83-48.286-44.434c-0.053-1.284-0.053-2.569,0-3.853v-55.28h7.12c4.418,0,8-3.582,8-8s-3.582-8-8-8
			h-30.24c-4.418,0-8,3.582-8,8s3.582,8,8,8h7.12v55.28c-1.234,34.44,25.686,63.36,60.126,64.594
			c34.44,1.234,63.36-25.686,64.594-60.126c0.053-1.489,0.053-2.979,0-4.468v-55.28h7.12c4.418,0,8-3.582,8-8
			S247.02,91.204,242.602,91.204z"
              />
            </svg>
          </div>
          <h2 className="pt-6 text-2xl font-bold tracking-wide text-center text-accents-4">
            Your cart is empty
          </h2>
        </div>
      ) : error ? (
        <div className="flex-1 flex flex-col justify-center items-center">
          <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
            <Cross width={24} height={24} />
          </span>
          <h2 className="pt-6 text-xl font-light text-center">
            We couldn’t process the purchase. Please check your card information
            and try again.
          </h2>
        </div>
      ) : success ? (
        <div className="flex-1 flex flex-col justify-center items-center">
          <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
            <Check />
          </span>
          <h2 className="pt-6 text-xl font-light text-center">
            Thank you for your order.
          </h2>
        </div>
      ) : (
        <>
          <div className="flex-1">
            <ul className="space-y-6">
              {data!.lineItems.map((item: any) => (
                <CartItem
                  key={item.id}
                  item={item}
                  currencyCode={data!.currency.code}
                />
              ))}
            </ul>
          </div>
          <div className="flex-shrink-0 mt-5 sticky bottom-0">
            <div className="flex justify-end flex-col  font-semibold text-primary space-y-3">
              <Link href="/checkout">
                <Button
                  className="truncate flex-1"
                  secondary
                  Component="a"
                  width="100%"
                >
                  CHECK OUT
                </Button>
              </Link>
              <Link href="/cart">
                <Button className="truncate flex-1" Component="a" width="100%">
                  VIEW BAG
                </Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default CartMenu
