import { Bag, Down, Search, User } from '@components/icons'
import { Container } from '@components/ui'
import { useUI } from '@components/ui/context'
import useCart from '@framework/cart/use-cart'
import { useCustomer } from '@framework/customer'
import type { LineItem } from '@framework/types'
import { getCurrencySymbol } from '@lib/currency'
import { useCurrency } from '@lib/hooks/useCurrency'
import { currencyList } from '@lib/locale'
import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { NavItem } from './Navbar'
import s from './UserNav.module.css'

interface Props {
  className?: string
}

const countItem = (count: number, item: LineItem) => count + item.quantity

export const BagItem: FC<{
  limit?: number
  className?: string
  onClick?: () => void
}> = ({ className, onClick, limit = 9 }) => {
  const { data, isLoading, isEmpty } = useCart()
  const itemsCount = data?.lineItems.reduce(countItem, 0) ?? 0
  const countStr = itemsCount > limit ? `${limit}+` : itemsCount
  return (
    <div className={className} onClick={onClick}>
      <Bag />
      {itemsCount > 0 && <span className={s.bagCount}>{countStr}</span>}
    </div>
  )
}
const UserNav: FC<Props> = ({ className }) => {
  const { data } = useCart()
  const { data: customer } = useCustomer()
  const router = useRouter()
  const { currency, setCurrency } = useCurrency()
  const { openSidebar, setModalView } = useUI()
  const itemsCount = (5 || data?.lineItems.reduce(countItem, 0)) ?? 0
  const symbol = getCurrencySymbol(currency as string)
  const { push } = useRouter()
  return (
    <nav className={cn(s.root, className)}>
      <div className={s.list}>
        <NavItem
          placement="right"
          className={cn(s.item, 'flex items-baseline relative')}
          dropdown={
            <div className="text-xs shadow-lg bg-accents-0 flex flex-col top-header px-md py-3">
              {currencyList.map((item: any, i) => {
                {
                  if (!item || !item.length || item === currency) return null

                  return (
                    <a
                      key={i}
                      onClick={() => setCurrency(item)}
                      className="leading-extra-loose flex flex-col items-start py-2"
                    >
                      <div
                        className={cn(
                          'inline-block text-effect-1 truncate text-h7',
                          currency === item && 'text-primary'
                        )}
                      >
                        {item}
                      </div>
                    </a>
                  )
                }
              })}
            </div>
          }
        >
          <div className="text-h7">
            GLOBAL ({symbol}
            {currency}){' '}
          </div>
          <span>
            <Down />
          </span>
        </NavItem>
        <div className={cn(s.item, s.visibleOnLg, 'group relative')}>
          <label className="z-10">
            <div className="relative flex justify-end ">
              <div className="pointer-events-none z-30">
                <Search />
              </div>
            </div>
            <div className=" absolute pointer-events-none top-0 -right-2 focus-within:w-80 focus-within:h-auto w-3 h-3 focus-within:pointer-events-auto transform opacity-0  focus-within:block focus-within:opacity-100 mt-8 focus-within:mt-0 transition-all duration-300 ease-in-out">
              <form
                onSubmit={(e: any) => {
                  e.preventDefault()
                  push(`/search?q=${e.target[0].value}`)
                }}
                className="h-header flex items-center"
              >
                <input
                  autoComplete="none"
                  id="search"
                  name="search"
                  className="w-full py-2 shadow-inner border border-accents-3 px-12 focus:w-80 focus:outline-none rounded-full  bg-accents-0 transition-all duration-300 ease-in-out"
                ></input>
              </form>
              <Container className="text-xs shadow-lg bg-accents-0 flex flex-col py-6  relative space-y-3">
                <div className="text-accents-6 text-xs ">Quick links</div>
                {new Array(5)
                  .fill([
                    'OTHER SHOP PAGES',
                    'Collection',
                    'LookBook',
                    'Categories Page',
                    'Shopping Cart',
                    'Wishlist',
                    'Order Tracking',
                    'Checkout',
                    'Checkout – 2 Columns',
                  ])
                  .map((menu, i) => {
                    {
                      const item = menu[i]
                      if (!item || !item.length) return null
                      return (
                        <div
                          key={i}
                          className="leading-extra-loose flex flex-col items-start space-y-3"
                        >
                          <Link href={`/search?q=${item}`}>
                            <a
                              className={cn(
                                s.link,
                                'inline-block text-xs text-effect-1'
                              )}
                            >
                              {item}
                            </a>
                          </Link>
                        </div>
                      )
                    }
                  })}
              </Container>
            </div>
          </label>
        </div>
        {!!customer ? (
          <NavItem
            placement="right"
            className={cn(s.item, 'flex items-baseline relative')}
            dropdown={
              <div className="text-xs shadow-lg bg-accents-0 flex flex-col top-header px-md py-2">
                <Link href={`/account`}>
                  <a className="leading-extra-loose flex flex-col items-start py-2 ">
                    <div
                      className={cn(
                        'inline-block text-effect-1 truncate h-7 uppercase'
                      )}
                    >
                      My account
                    </div>
                  </a>
                </Link>
                <Link href={`/account/logout`}>
                  <a className="leading-extra-loose flex flex-col items-start py-2">
                    <div
                      className={cn(
                        'inline-block text-effect-1 truncate h-7 uppercase'
                      )}
                    >
                      logout
                    </div>
                  </a>
                </Link>
              </div>
            }
          >
            <User />
          </NavItem>
        ) : (
          <div className={s.item}>
            <Link href="/account/login">
              <a>
                <User />
              </a>
            </Link>
          </div>
        )}

        <BagItem
          className={s.item}
          onClick={() => {
            setModalView('CART')
            openSidebar()
          }}
        ></BagItem>
      </div>
    </nav>
  )
}

export default UserNav
