import { useUI } from '@components/ui'
import cn from 'classnames'
import throttle from 'lodash.throttle'
import { FC, useEffect, useState } from 'react'
import s from './Navbar.module.css'
export interface Props {
  transparent?: boolean
}
const NavbarRoot: FC<Props> = ({ children, transparent }) => {
  const [hasScrolled, setHasScrolled] = useState(false)
  const { scrollerRef } = useUI()
  useEffect(() => {
    const element = scrollerRef.current || document
    const handleScroll = throttle(() => {
      const offset = 0
      const { scrollTop } = scrollerRef.current || element.documentElement
      const scrolled = scrollTop > offset
      if (hasScrolled !== scrolled) {
        setHasScrolled(scrolled)
      }
    }, 200)
    handleScroll()
    element.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      element.removeEventListener('scroll', handleScroll)
    }
  }, [hasScrolled])

  return (
    <header
      className={cn(
        s.root,
        transparent && s.transparent,
        hasScrolled && s.hasScrolled
      )}
    >
      {children}
    </header>
  )
}

export default NavbarRoot
