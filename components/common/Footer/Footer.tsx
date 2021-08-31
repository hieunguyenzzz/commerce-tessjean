import {
  Facebook,
  Instagram,
  Location,
  Pinterest,
  Tiktok,
} from '@components/icons'
import { Container, Text } from '@components/ui'
import Link from '@components/ui/Link'
import type { Page } from '@framework/common/get-all-pages'
import getSlug from '@lib/get-slug'
import { default as classNames, default as cn } from 'classnames'
import { useRouter } from 'next/router'
import { FC } from 'react'
import s from './Footer.module.css'

interface Props {
  className?: string
  children?: any
  pages?: Page[]
}

const LEGAL_PAGES = ['terms-of-use', 'shipping-returns', 'privacy-policy']

const Footer: FC<Props> = ({ className, pages }) => {
  const { pathname } = useRouter()
  const rootClassName = cn(s.root, className, 'mt-12 text-center md:text-left')
  const customercare = [
    { title: 'SHIPPING', slug: 'shipping' },
    { title: 'RETURNS', slug: 'returns' },
    { title: 'ORDERING', slug: 'ordering' },
    { title: 'GARMENT CARE', slug: 'garment-care' },
    { title: 'SIZE GUIDE', slug: 'size-guide' },
    { title: 'ETHICS', slug: 'ethics' },
    { title: 'FAQS', slug: 'faqs' },
    { title: 'CONTACT US', slug: 'contact-us' },
  ]
  const legalPages = [
    { title: 'ABOUT', slug: 'about' },
    { title: 'ETHICS', slug: 'pages/ethics' },
    { title: 'JOURNAL', slug: 'blog/journal' },
    { title: 'PRIVACY POLICY', slug: 'privacy-policy' },
    { title: 'TERMS & CONDITIONS', slug: 'terms' },
  ]
  return (
    <footer className={rootClassName}>
      <Container small>
        <div className="w-full grid grid-cols-3 lg:grid-cols-9 gap-y-[31px] md:gap-y-xl gap-6  transition-colors duration-150 py-[32px] md:py-11  border-b border-t border-accents-3 md:border-none">
          <div className="col-span-3 space-y-4 lg:space-y-[38px]  ">
            <Text variant="h5">CUSTOMER CARE</Text>
            <ul
              className={classNames(
                ' flex flex-initial flex-col md:flex-1 text-sm space-y-sm lg:space-y-4'
              )}
            >
              {customercare.map(({ title, slug }, i) => (
                <Link key={i} href={'/pages/' + slug}>
                  <Text
                    className={classNames('text-effect-1', {
                      'text-primary': pathname.includes('/pages/' + slug),
                    })}
                    variant="h7"
                  >
                    {title}
                  </Text>
                </Link>
              ))}
            </ul>
          </div>
          <div className="col-span-3 space-y-4 lg:space-y-[38px]">
            <Text variant="h5">OUR BRAND</Text>
            <ul className="flex flex-initial flex-col md:flex-1 text-sm space-y-sm lg:space-y-4">
              {legalPages.map(({ title, slug }, i) => (
                <Link key={i} href={'/' + slug}>
                  <Text className="text-effect-1" variant="h7">
                    {title}
                  </Text>
                </Link>
              ))}
            </ul>
          </div>
          <div className="col-span-3 space-y-8 flex flex-col">
            <div className="space-y-sm lg:space-y-4">
              <Text variant="h5">FOLLOW US</Text>
              <div className="space-x-6 inline-flex text-2xl">
                <span className="rounded-full hover-effect-1">
                  <Facebook />
                </span>
                <span className="rounded-full hover-effect-1">
                  <Instagram />
                </span>
                <span className="rounded-full hover-effect-1">
                  <Pinterest />
                </span>
                <span className="rounded-full hover-effect-1">
                  <Tiktok />
                </span>
              </div>
            </div>
            <div className="text-[14px] leading-[1.3] tracking-[0.13em] md:text-sm space-y-sm lg:space-y-6">
              <p className="whitespace-pre-line">
                {`hello@tessjean.com 
                +84 077 277 0802`}
              </p>
              <p className="whitespace-pre-line">
                {`Customer Care hours: 
                Monday - Friday 8:00am - 4:30pm ICT`}
              </p>
            </div>
          </div>
        </div>
      </Container>
      <Container>
        <div className="py-4 md:py-6  flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0   md:border-t border-accents-3">
          <div className="flex uppercase text-[12px] leading-[14.42PX] md:text-xs md:flex-1 space-x-6">
            2021, ALL RIGHTS RESERVED TESSJEAN
          </div>
          <div className="flex space-x-2 items-center text-[10px] md:text-xs leading-none font-bold">
            <Location /> <div>SAIGON, VIETNAM</div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

function usePages(pages?: Page[]) {
  const { locale } = useRouter()
  const sitePages: Page[] = []
  const legalPages: Page[] = []

  if (pages) {
    pages.forEach((page) => {
      const slug = page.url && getSlug(page.url)
      if (!slug) return
      if (locale && !slug.startsWith(`${locale}/`)) return

      if (isLegalPage(slug, locale)) {
        legalPages.push(page)
      } else {
        sitePages.push(page)
      }
    })
  }

  return {
    sitePages: sitePages.sort(bySortOrder),
    legalPages: legalPages.sort(bySortOrder),
  }
}

const isLegalPage = (slug: string, locale?: string) =>
  locale
    ? LEGAL_PAGES.some((p) => `${locale}/${p}` === slug)
    : LEGAL_PAGES.includes(slug)

// Sort pages by the sort order assigned in the BC dashboard
function bySortOrder(a: Page, b: Page) {
  return (a.sort_order ?? 0) - (b.sort_order ?? 0)
}

export default Footer
