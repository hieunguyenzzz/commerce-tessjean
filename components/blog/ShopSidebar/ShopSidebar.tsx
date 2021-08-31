import { SidebarLayout } from '@components/common'
import { Sidebar, useUI } from '@components/ui'
import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'
interface Props {
  categories?: {
    label: string
    getHref: () => string
  }[]
  title?: string
  currentTag?: string
}

const ShopSidebar: React.FC<Props> = ({
  categories = [],
  title = 'SHOP',
  currentTag,
}) => {
  const { displaySidebar, closeSidebar, modalView, setModalView } = useUI()
  return (
    <Sidebar
      position="left"
      open={displaySidebar && modalView === 'SHOP'}
      onClose={closeSidebar}
    >
      <SidebarLayout title={title}>
        <div className="space-y-md flex flex-col">
          <h3 className="text-[22px] uppercase">CLOTHING</h3>
          {categories.map(({ label: str, getHref }) => (
            <Link key={str} href={getHref()}>
              <a
                className={classNames('text-h7 hover:underline uppercase', {
                  'text-primary': str === currentTag,
                })}
              >
                {str}
              </a>
            </Link>
          ))}
        </div>
        <div className="h-lg" />
        <div className="space-y-2  flex flex-col items-start">
          <a className={classNames('inline-block header-2 py-2 ')}>OUR EDITS</a>
          <Link href={`/search?q=${'motherhood'}`}>
            <a
              className={classNames('inline-block text-h7 text-effect-1 py-2 ')}
            >
              MOTHERHOOD
            </a>
          </Link>
        </div>
      </SidebarLayout>
    </Sidebar>
  )
}
export default ShopSidebar
