import '@assets/chrome-bug.css'
import '@assets/main.css'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'
import 'keen-slider/keen-slider.min.css'
import { NextPageContext } from 'next'
import type { AppProps } from 'next/app'
import instagramPosts from 'public/instagramPosts.json'
import { FC, useEffect } from 'react'
const Noop: FC = ({ children }) => <>{children}</>

function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop
  const renderNavbar = (Component as any).renderNavbar
  const renderMenu = (Component as any).renderMenu

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <>
      <Head />
      <ManagedUIContext>
        <Layout
          pageProps={pageProps}
          renderNavbar={renderNavbar}
          renderMenu={renderMenu}
        >
          <Component {...pageProps} />
        </Layout>
      </ManagedUIContext>
    </>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//

MyApp.getInitialProps = async (appContext: NextPageContext) => {
  return {
    pageProps: {
      email: 'hello@tessjean.com',
      phone: '+84 077 277 0802',
      customerCareHours: 'Monday - Friday 8:00am - 4:30pm ICT',
      location: 'SAIGON, VIETNAM',
      instagramPosts,
      socials: {
        instagram: 'https://www.instagram.com/_TESSJEAN_/',
        facebook: 'https://www.facebook.com/tessjeanwoman',
        pinterest: 'https://www.pinterest.com/tessjean',
        tiktok: 'https://www.tiktok.com/tessjean',
      },
    },
  }
}
export default MyApp
