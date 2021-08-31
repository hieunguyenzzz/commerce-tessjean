import useCustomer from '@commerce/customer/use-customer'
import { UserNav } from '@components/common'
import { Logo as LogoIcon, Menu, User } from '@components/icons'
import { CATEGORIES } from '@components/product/helpers'
import { Container, Text, useUI } from '@components/ui'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, ReactElement, useEffect, useState } from 'react'
import s from './Navbar.module.css'
import NavbarRoot from './NavbarRoot'
import { BagItem } from './UserNav'
export interface Props {
  modalView?: 'MENU' | 'SEARCH' | 'SHOP' | 'COLLECTION'
  transparent?: boolean
}
const renderItem = (renderer: any, index: any) => renderer(index)

const shopMenu = CATEGORIES

export const Logo = () => (
  <Link href="/">
    <a className={classNames(s.logo)} aria-label="Logo">
      <LogoIcon width="139px" height="29px" />
    </a>
  </Link>
)
interface NavItemProps {
  href?: string
  className?: string
  active?: boolean
  placement?: 'full' | 'left' | 'right'
  dropdown?: ReactElement
}
export const NavItem: React.FC<NavItemProps> = ({
  children,
  href,
  active,
  placement = 'full',
  dropdown,
  className,
}) => {
  return (
    <div
      tabIndex={-1}
      className={classNames('group flex items-center h-header-lg', className)}
    >
      {href ? (
        <Link href={href}>
          <a className={classNames(s.link, 'z-10', { [s.active]: active })}>
            {children}
          </a>
        </Link>
      ) : (
        <a className={classNames(s.link, 'z-10', { [s.active]: active })}>
          {children}
        </a>
      )}

      {dropdown && (
        <div
          className={classNames(
            'absolute top-0 pt-header lg:pt-header-lg pointer-events-none group-hover:pointer-events-auto opacity-0 group-hover:block group-hover:opacity-100 mt-8 group-hover:mt-0 transition-all duration-300 ease-in-out',
            {
              'left-0 w-full': placement === 'full',
              'left-0': placement === 'left',
              'right-0': placement === 'right',
            }
          )}
        >
          {dropdown}
        </div>
      )}
    </div>
  )
}
const Navbar: FC<Props> = ({ transparent, modalView = 'MENU' }) => {
  const { openSidebar, setModalView, displaySidebar, closeSidebar } = useUI()
  const { data: customer } = useCustomer()
  const [update, setUpdate] = useState<number>()
  const router = useRouter()
  useEffect(() => {
    setUpdate(Date.now())
  }, [router])
  const smallNav = (
    <div className="flex w-full flex-1 py-4 items-center align-center">
      <div className="flex-1 flex items-center">
        <div
          onClick={() => {
            setModalView(modalView)
            openSidebar()
          }}
          className={classNames(s.item, 'z-10')}
        >
          <Menu />
        </div>
      </div>
      <div className="text-center mx-3 flex-1">
        <Logo />
      </div>
      <div className="flex flex-1 justify-end space-x-[11px]">
        {!!customer ? (
          <NavItem
            placement="right"
            className={classNames(s.item, 'flex items-baseline relative')}
            dropdown={
              <div className="text-xs shadow-lg bg-accents-0 flex flex-col top-header px-md py-2">
                <Link href={`/account`}>
                  <a className="leading-extra-loose flex flex-col items-start py-2 ">
                    <div
                      className={classNames(
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
                      className={classNames(
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
          className={classNames(s.item, 'flex items-center')}
          onClick={() => {
            setModalView('CART')
            openSidebar()
          }}
        ></BagItem>
      </div>
    </div>
  )
  const largeNav = (
    <div key={update} className="flex w-full py-4 items-center align-center ">
      <div className="flex-1 justify-start space-x-[1.6vw] 2xl:space-x-[36px] h-header flex items-center">
        <NavItem href="/" placement="full">
          NEW ARRIVALS
        </NavItem>
        <NavItem
          placement="full"
          href={'/search'}
          active={router.pathname.startsWith('/search')}
          dropdown={
            <div className="w-full py-6 bg-accents-0 shadow-magical">
              <Container className="w-full flex text-xs relative">
                <div className="flex flex-1 space-x-24 justify-start py-10 ">
                  <Text variant="h4">CLOTHING</Text>
                  <div className="space-y-6">
                    <div className="space-y-2  flex flex-col items-start">
                      {shopMenu.map(({ label, getHref }, i) => {
                        {
                          return (
                            <Link key={i} href={getHref()}>
                              <a
                                className={classNames(
                                  'inline-block text-h7 text-effect-1 py-2 '
                                )}
                              >
                                {label}
                              </a>
                            </Link>
                          )
                        }
                      })}
                    </div>

                    <div className="space-y-2  flex flex-col items-start">
                      <a className={classNames('inline-block header-2 py-2 ')}>
                        OUR EDITS
                      </a>
                      <Link href={`/search?q=${'motherhood'}`}>
                        <a
                          className={classNames(
                            'inline-block text-h7 text-effect-1 py-2 '
                          )}
                        >
                          MOTHERHOOD
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
                <Link href={`/search?q=${'softlines'}`}>
                  <a className="flex-1 space-y-4 flex flex-col items-start">
                    <Image
                      className="bg-accents-1"
                      layout="intrinsic"
                      width={447}
                      height={276}
                      objectFit="cover"
                      src={'/mega-menu-v1-1.jpg'}
                    ></Image>
                    <div className="header-2 text-effect-1">
                      SOFTLINES JUST IN
                    </div>
                  </a>
                </Link>
              </Container>
            </div>
          }
        >
          SHOP
        </NavItem>
        <NavItem
          placement="full"
          dropdown={
            <div className="w-full py-6 bg-accents-0 shadow-magical">
              <Container className="w-full flex text-xs relative">
                <div className="flex flex-1 space-x-24 justify-start py-10 ">
                  <Text variant="h4">collections</Text>
                  <div className="space-x-6 flex ">
                    <Link href={`/collections/${'001-softtest'}`}>
                      <a className="flex-1 flex items-start flex-col space-y-4">
                        <Image
                          className="bg-accents-1"
                          layout="intrinsic"
                          width={250}
                          height={296}
                          objectFit="cover"
                          src={'/mega-menu-v1-1.jpg'}
                        ></Image>
                        <div className="header-2 text-effect-1">
                          001 SOFTLINES
                        </div>
                      </a>
                    </Link>
                    <Link href={`/collections/${'002-la-mar'}`}>
                      <a className="flex-1 flex items-start flex-col space-y-4">
                        <Image
                          className="bg-accents-1"
                          layout="intrinsic"
                          width={250}
                          height={296}
                          objectFit="cover"
                          src={'/mega-menu-v1-2.jpg'}
                        ></Image>
                        <div className="header-2 text-effect-1">002 LA MAR</div>
                      </a>
                    </Link>
                  </div>
                </div>
              </Container>
            </div>
          }
        >
          COLLECTIONS
        </NavItem>
        <NavItem className="relative" placement="left" href="/pages/ethics">
          ETHICS
        </NavItem>
        <NavItem
          href="/blog/journal"
          className="relative"
          placement="left"
          active={router.pathname.startsWith('/blog/journal')}
        >
          JOURNAL
        </NavItem>
      </div>
      <div className={s.logo}>
        <Logo />
      </div>
      <div className="flex justify-end flex-1  space-x-md">
        <UserNav />
      </div>
    </div>
  )

  return (
    <NavbarRoot transparent={transparent}>
      <div className="w-full">
        <Container>
          <div className="w-full xl:hidden">{smallNav}</div>
          <div className="w-full hidden xl:block">{largeNav}</div>
        </Container>
      </div>
    </NavbarRoot>
  )
}

export default Navbar
