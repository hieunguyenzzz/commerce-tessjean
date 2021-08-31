import LoginView from '@components/auth/LoginView'
import { CartMenu } from '@components/cart'
import { Footer, Navbar } from '@components/common'
import { Close } from '@components/icons'
import { MenuSidebarView } from '@components/menu'
import { Container, Modal, Sidebar } from '@components/ui'
import { useUI } from '@components/ui/context'
import { CommerceProvider } from '@framework'
import type { Page } from '@framework/common/get-all-pages'
import ClickOutside from '@lib/click-outside'
import { useAcceptCookies } from '@lib/hooks/useAcceptCookies'
import cn from 'classnames'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { FC, ReactNode, useEffect } from 'react'
import Loading from '../Loading'
import s from './Layout.module.css'
const dynamicProps = {
  loading: () => <Loading />,
}

const ForgotPassword = dynamic(
  () => import('@components/auth/ForgotPassword'),
  dynamicProps
)

const FeatureBar = dynamic(
  () => import('@components/common/FeatureBar'),
  dynamicProps
)

interface Props {
  renderNavbar?: () => ReactNode
  renderMenu?: () => ReactNode
  pageProps: {
    pages?: Page[]
    commerceFeatures: Record<string, boolean>
  }
}

const Layout: FC<Props> = ({
  children,
  renderNavbar,
  renderMenu,
  pageProps: { commerceFeatures, ...pageProps },
}) => {
  const {
    displaySidebar,
    displayModal,
    closeSidebar,
    closeModal,
    dynamicModal,
    setDynamicModal,
    modalView,
  } = useUI()
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies()
  const { locale = 'en-US', pathname, query, asPath } = useRouter()
  useEffect(() => {
    closeSidebar()
    closeModal()
    setDynamicModal(null)
  }, [pathname, query, asPath, closeSidebar, closeModal])
  const promoAds = 'FREE SHIPPING ALL ORDERS OVER $300'
  return (
    <CommerceProvider locale={locale}>
      {!!promoAds && (
        <div
          className={cn(
            'w-full text-center px-3 text-[12px] flex items-center justify-center h-[22px] overflow-hidden uppercase bg-primary text-white py-[3px]'
          )}
        >
          FREE SHIPPING ALL ORDERS OVER $300
        </div>
      )}
      <div className={cn(s.root)}>
        {renderNavbar ? renderNavbar() : <Navbar />}
        <main className="fit">{children}</main>
        <Footer pages={pageProps.pages} />
        <FeatureBar
          title={
            <>
              We use cookies to improve our website and your shopping
              experience. By continuing to browse our website, you are
              consenting to our use of cookies. To find out more read out{' '}
              <span className="inline-block">
                <a className="underline" href="/privacy-policy" target="_blank">
                  Cookies & Privacy Policy
                </a>
              </span>{' '}
              .
            </>
          }
          onClose={onAcceptCookies}
          hide={acceptedCookies}
        />
        <Sidebar
          position="left"
          open={displaySidebar && modalView === 'MENU'}
          onClose={closeSidebar}
        >
          {renderMenu ? renderMenu() : <MenuSidebarView />}
        </Sidebar>
        <Modal open={displayModal} onClose={closeModal}>
          {modalView === 'LOGIN_VIEW' && <LoginView />}
          {modalView === 'FORGOT_VIEW' && <ForgotPassword />}
        </Modal>
        {modalView === 'CART' && displaySidebar && (
          <ClickOutside active onClick={closeSidebar}>
            <div
              onClick={closeSidebar}
              className="sm:pointer-events-none z-50 fixed sm:fixed top-0 pt-[126px] pb-[50px] right-0 h-screen overflow-auto bg-black bg-opacity-50 sm:pt-5 sm:bg-transparent w-full"
            >
              <Container className="flex justify-end items-start h-full">
                <div
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                  className="relative max-h-full overflow-auto pointer-events-auto w-full  sm:w-[470px] max-w-full bg-accents-0  border border-black shadow p-[24px] lg:px-[33px] lg:py-[23px]"
                >
                  <CartMenu />
                  <div
                    onClick={closeSidebar}
                    className="text-[12px] bg-white bg-opacity-60 p-2 md:hidden absolute top-[12px] right-[12px] hover-effect-1 rounded-full"
                  >
                    <Close />
                  </div>
                </div>
              </Container>
            </div>
          </ClickOutside>
        )}
      </div>
      {!!dynamicModal && dynamicModal}
    </CommerceProvider>
  )
}

export default Layout
