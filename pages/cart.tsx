import { LineItem } from '@commerce/types'
import { FullCartItem } from '@components/cart'
import { Breadcrumb, Layout } from '@components/common'
import { Back, Bag, Check, CreditCard, Cross, MapPin } from '@components/icons'
import { Button, Container, Text } from '@components/ui'
import { getConfig } from '@framework/api'
import useCart from '@framework/cart/use-cart'
import getAllPages from '@framework/common/get-all-pages'
import usePrice from '@framework/product/use-price'
import type { GetStaticPropsContext } from 'next'

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })
  const { pages } = await getAllPages({ config, preview })
  return {
    props: { pages },
  }
}
const countItem = (count: number, item: LineItem) => count + item.quantity

export default function Cart() {
  const error = null
  const success = null
  const { data, isLoading, isEmpty } = useCart()
  const itemsCount = data?.lineItems.reduce(countItem, 0) ?? 0

  const { price: subTotal } = usePrice(
    data && {
      amount: Number(data.subtotalPrice),
      currencyCode: data.currency.code,
    }
  )
  const { price: total } = usePrice(
    data && {
      amount: Number(data.totalPrice),
      currencyCode: data.currency.code,
    }
  )

  return (
    <>
      <Container className="pt-md mb-6">
        <Breadcrumb>Cart</Breadcrumb>
      </Container>
      <Container small className="grid lg:grid-cols-12 gap-6  py-md lg:py-6">
        <div className="lg:col-span-12">
          {isLoading || isEmpty ? (
            <div className="flex-1  py-24 flex flex-col justify-center items-center ">
              <span className="border border-dashed border-secondary flex items-center justify-center w-16 h-16 bg-accents-3 p-12 rounded-lg text-primary">
                <Bag className="absolute" />
              </span>
              <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
                Your cart is empty
              </h2>
            </div>
          ) : error ? (
            <div className="flex-1  flex flex-col justify-center items-center">
              <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
                <Cross width={24} height={24} />
              </span>
              <h2 className="pt-6 text-xl font-light text-center">
                We couldn’t process the purchase. Please check your card
                information and try again.
              </h2>
            </div>
          ) : success ? (
            <div className="flex-1  flex flex-col justify-center items-center">
              <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
                <Check />
              </span>
              <h2 className="pt-6 text-xl font-light text-center">
                Thank you for your order.
              </h2>
            </div>
          ) : (
            <div className=" flex-1 space-y-md lg:space-y-6  ">
              <Text variant="sectionHeading">Items: {itemsCount}</Text>
              <ul className="border-t border-black sm:py-0 sm:space-y-0 divide-y divide-black border-b border-accents-2">
                {data!.lineItems.map((item) => (
                  <FullCartItem
                    key={item.id}
                    item={item}
                    currencyCode={data?.currency.code!}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="lg:col-span-12 space-y-6">
          <div className="flex-shrink-0 ">
            {process.env.COMMERCE_CUSTOMCHECKOUT_ENABLED && (
              <>
                {/* Shipping Address */}
                {/* Only available with customCheckout set to true - Meaning that the provider does offer checkout functionality. */}
                <div className="rounded-md border border-accents-2 px-6 py-md lg:py-6 mb-4 text-center flex items-center justify-center cursor-pointer hover:border-accents-4">
                  <div className="mr-5">
                    <MapPin />
                  </div>
                  <div className="text-sm text-center font-medium">
                    <span className="uppercase">+ Add Shipping Address</span>
                    {/* <span>
                    1046 Kearny Street.<br/>
                    San Franssisco, California
                  </span> */}
                  </div>
                </div>
                {/* Payment Method */}
                {/* Only available with customCheckout set to true - Meaning that the provider does offer checkout functionality. */}
                <div className="rounded-md border border-accents-2 px-6 py-md lg:py-6 mb-4 text-center flex items-center justify-center cursor-pointer hover:border-accents-4">
                  <div className="mr-5">
                    <CreditCard />
                  </div>
                  <div className="text-sm text-center font-medium">
                    <span className="uppercase">+ Add Payment Method</span>
                    {/* <span>VISA #### #### #### 2345</span> */}
                  </div>
                </div>
              </>
            )}
            <div>
              <ul className="py-3 lg:flex lg:space-x-3 justify-between">
                <li className="flex justify-between py-1">
                  <span className="text-[12px] lg:text-base text-accents-6">
                    I agree to the{' '}
                    <a className="underline" href="#">
                      terms and conditions
                    </a>
                  </span>
                </li>
                <li className="flex justify-between py-1 space-x-3">
                  <span className="text-[14px] lg:text-h5 font-bold uppercase">
                    Shipping:
                  </span>
                  <span className="text-[12px] lg:text-base text-accents-6">
                    Calculated at checkout
                  </span>
                </li>
                <li className="flex justify-between py-1 space-x-3">
                  <span className="text-[14px] lg:text-h5 font-bold uppercase">
                    Subtotal
                  </span>
                  <span className="text-[14px] lg:text-h5 font-bold uppercase">
                    {subTotal}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-row justify-end">
            <div className="w-full max-w-[800px]">
              {isEmpty ? (
                <Button href="/" Component="a" width="100%">
                  Continue Shopping
                </Button>
              ) : (
                <div className="flex flex-col space-y-3 lg:space-y-0 lg:space-x-3-reverse justify-end truncate lg:flex-row-reverse">
                  <Button href="/checkout" Component="a" width="100%">
                    Proceed to Checkout
                  </Button>
                  <Button variant="ghost" href="/" Component="a" width="100%">
                    <div className="text-[24px] px-3">
                      <Back />
                    </div>
                    <div className="pr-[24px] mr-3 leading-none">
                      Continue Shopping
                    </div>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

Cart.Layout = Layout
