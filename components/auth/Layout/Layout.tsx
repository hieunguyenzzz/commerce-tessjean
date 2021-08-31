import AdsSignupView from '@components/others/AdsSignup'
import { Container } from '@components/ui'
import classNames from 'classnames'
import Image from 'next/image'
import React from 'react'
import s from './Layout.module.css'
const Layout: React.FC<{
  cover?: string
}> = ({ children, cover = '/signIn.png' }) => (
  <>
    <div
      className={classNames(
        s.root,
        'grid grid-cols-1 lg:grid-cols-2 h-full w-full  justify-center items-center fit'
      )}
      data-testid="Layout"
    >
      <div className="h-full flex flex-1 order-2 lg:order-1">
        <Container>{children}</Container>
      </div>
      <div className="block w-full relative h-[261px] lg:h-full bg-accents-1 order-1">
        <Image layout="fill" src={cover} objectFit="cover" />
      </div>
    </div>
    <Container className="lg:hidden py-12">
      <div className="h-12" />
      <AdsSignupView />
    </Container>
  </>
)
export default Layout
