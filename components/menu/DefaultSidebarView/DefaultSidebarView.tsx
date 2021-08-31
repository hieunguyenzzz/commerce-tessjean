import { SidebarLayout } from '@components/common'
import { Search } from '@components/icons'
import type { Page } from '@framework/common/get-all-pages'
import getSlug from '@lib/get-slug'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import s from './DefaultSidebarView.module.css'
interface Props {
  children?: any
  pages?: Page[]
}
const DefaultSidebarView: FC<Props> = ({ pages }) => {
  const { sitePages, legalPages } = usePages(pages)
  const router = useRouter()
  return (
    <SidebarLayout
      icon={<Search />}
      title={
        <form
          onSubmit={(e) => {
            e.preventDefault()
            router.push(
              `/search?q=${e.currentTarget.querySelector('input')?.value}`
            )
          }}
          className="w-full flex space-x-3 text-accents-6 focus-within:text-primary"
        >
          <input
            className="flex-1 text-base bg-transparent appearance-none focus:outline-none block border-none p-0 "
            type="text"
            placeholder="Search..."
          ></input>
        </form>
      }
      className={s.root}
    >
      <div className="space-y-md flex flex-col">
        {[
          { title: 'NEW ARRIVALS', slug: 'NEW-ARRIVALS' },
          { title: 'SHOP', slug: 'SHOP' },
          { title: 'COLLECTIONS', slug: 'COLLECTIONS' },
          { title: 'ETHICS', slug: 'ETHICS' },
          { title: 'JOURNAL', slug: 'blog' },
        ].map(({ title, slug }) => (
          <Link key={slug} href={decodeURI(`/${slug.toLocaleLowerCase()}`)}>
            <a className={classNames('text-h7 hover:underline uppercase')}>
              {title}
            </a>
          </Link>
        ))}
      </div>
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
export default DefaultSidebarView
