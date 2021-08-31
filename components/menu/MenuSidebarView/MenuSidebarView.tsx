import { SidebarLayout } from '@components/common'
import {
  Facebook,
  Instagram,
  Pinterest,
  Search,
  Twitter,
} from '@components/icons'
import { Container } from '@components/ui'
import type { Page } from '@framework/common/get-all-pages'
import getSlug from '@lib/get-slug'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import s from './MenuSidebarView.module.css'
interface Props {
  children?: any
  pages?: Page[]
}
const MenuSidebarView: FC<Props> = ({ pages }) => {
  const { sitePages, legalPages } = usePages(pages)

  return (
    <SidebarLayout className={s.root}>
      <Container className="pt-4 pb-4 space-y-8">
        <div className="w-full flex space-x-3 border-b-2 border-accents-6 focus-within:border-black text-accents-6 focus-within:text-primary py-2">
          <span className="focus:outline-none border-none bg-transparent appearance-none text-right inline-flex items-center text-2xl">
            <Search />
          </span>
          <input
            className="flex-1 bg-transparent appearance-none focus:outline-none block border-none p-0 "
            type="text"
            placeholder="Search..."
          ></input>
        </div>

        <div>
          <ul className="flex flex-initial flex-col md:flex-1 space-y-2">
            <li className="">
              <Link href="/">
                <a className=" text-effect-2 font-semibold  transition ease-in-out duration-150">
                  Home
                </a>
              </Link>
            </li>
            <li className="">
              <Link href="/">
                <a className=" text-effect-2 font-semibold  transition ease-in-out duration-150">
                  Careers
                </a>
              </Link>
            </li>
            <li className="">
              <Link href="/blog/journal">
                <a className=" text-effect-2 font-semibold  transition ease-in-out duration-150">
                  Blog
                </a>
              </Link>
            </li>
            {sitePages.map((page) => (
              <li key={page.url} className="">
                <Link href={page.url!}>
                  <a className=" text-effect-2 font-semibold  transition ease-in-out duration-150">
                    {page.name}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ul className="flex flex-initial flex-col md:flex-1 space-y-2">
            {['all', 'clothes', 'accessories', 'shoes'].map((string) => {
              return (
                <li key={string} className="">
                  <Link href={`/${string}`}>
                    <a className=" text-effect-2 font-semibold  transition ease-in-out duration-150">
                      {string}
                    </a>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="space-y-3">
          <div className=" font-semibold  transition ease-in-out duration-150">
            Contact us
          </div>
          <p className=" leading-relaxed text-accents-6">
            69 Halsey St, Ny 10002, New York, United States
            support.center@unero.co
          </p>
          <p className=" leading-relaxed text-accents-6">(0091) 8547 632521</p>
        </div>

        <div className="flex">
          <div className="flex-1 space-y-1 flex flex-col">
            <div className="font-semibold  mb-2">Language</div>
            <a className="cursor-pointer text-effect-2 text-effect-2_active hover:text-primary  text-primary">
              English
            </a>
            <a className="cursor-pointer text-effect-2 hover:text-primary ">
              French
            </a>
            <a className="cursor-pointer text-effect-2 hover:text-primary ">
              Arabric
            </a>
          </div>
          <div className="w-3" />
          <div className="flex-1 space-y-1 flex flex-col">
            <div className="font-semibold  mb-2">Currencies</div>
            <a className="cursor-pointer text-effect-2 text-effect-2_active hover:text-primary  text-primary">
              USD - US Dollar
            </a>
            <a className="cursor-pointer text-effect-2 hover:text-primary ">
              Euro
            </a>
            <a className="cursor-pointer text-effect-2 hover:text-primary ">
              Pround
            </a>
          </div>
        </div>
        <div className="space-y-3">
          <div className=" font-semibold transition ease-in-out duration-150">
            Follow US On Socials
          </div>
          <div className="flex-1 flex  items-center space-x-4 text-sm">
            <span className="hover-effect-1 rounded-full">
              <Pinterest />
            </span>
            <span className="hover-effect-1 rounded-full">
              <Instagram />
            </span>
            <span className="hover-effect-1 rounded-full">
              <Facebook />
            </span>
            <span className="hover-effect-1 rounded-full">
              <Twitter />
            </span>
          </div>
        </div>
      </Container>
    </SidebarLayout>
  )
}

interface Props {
  className?: string
  children?: any
  pages?: Page[]
}

const LEGAL_PAGES = ['terms-of-use', 'shipping-returns', 'privacy-policy']
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
export default MenuSidebarView
