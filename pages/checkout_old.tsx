import { LineItem } from '@commerce/types'
import { FullCartItem } from '@components/cart'
import { Breadcrumb, Layout } from '@components/common'
import { Bag, Check, Cross } from '@components/icons'
import { Button, Container, Input, Text } from '@components/ui'
import { getConfig } from '@framework/api'
import useCart from '@framework/cart/use-cart'
import getAllPages from '@framework/common/get-all-pages'
import usePrice from '@framework/product/use-price'
import { countryList } from '@lib/countries'
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

export default function Checkout() {
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
      <Container>
        <div className="grid lg:grid-cols-12 gap-6  py-md lg:py-6">
          <div className="lg:col-span-7">
            <div className="px-12">
              <div className="space-y-12">
                <div className="pt-md mb-6">
                  <Breadcrumb>
                    <a href="#" className="text-primary">
                      Cart
                    </a>{' '}
                    /{' '}
                    <a href="#" className="">
                      Infomation
                    </a>{' '}
                    /{' '}
                    <a href="#" className="text-primary">
                      Shipping
                    </a>{' '}
                    /{' '}
                    <a href="#" className="text-primary">
                      Payment
                    </a>
                  </Breadcrumb>
                </div>
                <div className="space-y-4">
                  <div className="font-bold text-lg">Contact infomation</div>
                  <div className="space-y-3">
                    <Input></Input>
                    <label
                      className="flex space-x-2 items-center"
                      onClick={() => {}}
                    >
                      <input name="acceptsMarketing" type="checkbox" />
                      <div>Keep me up to date on news and offers</div>
                    </label>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="font-bold text-lg">Shipping address</div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-3">
                      <Input placeholder="First name (Optional)"></Input>
                    </div>
                    <div className="space-y-3">
                      <Input placeholder="Last name"></Input>
                    </div>
                    <div className="space-y-3 col-span-2">
                      <Input placeholder="Address"></Input>
                    </div>
                    <div className="space-y-3 col-span-2">
                      <Input placeholder="Apartment ,suite ,etc. (Optional)"></Input>
                    </div>
                    <div className="space-y-3">
                      <Input placeholder="Postal code"></Input>
                    </div>
                    <div className="space-y-3">
                      <Input placeholder="City"></Input>
                    </div>
                    <div className="space-y-3 col-span-2">
                      <Input
                        type="select"
                        className="w-full"
                        placeholder="Country/region"
                      >
                        {countryList.map((item) => {
                          return (
                            <option key={item.name} value={item.name}>
                              {item.description}
                            </option>
                          )
                        })}
                      </Input>
                    </div>
                    <label
                      className="flex space-x-2 items-center"
                      onClick={() => {}}
                    >
                      <input name="acceptsMarketing" type="checkbox" />
                      <div>Save this infomation for next time</div>
                    </label>
                  </div>
                </div>
                <div className="space-x-3">
                  <Button>Countinue to shipping</Button>
                  <Button variant="ghost">Return to cart</Button>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 space-y-6 border">
            <div className="grid lg:grid-cols-12 gap-6  py-md lg:py-6 px-12">
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
                <ul className="py-3 justify-between">
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
          </div>
        </div>
      </Container>
    </>
  )
}

Checkout.Layout = Layout
