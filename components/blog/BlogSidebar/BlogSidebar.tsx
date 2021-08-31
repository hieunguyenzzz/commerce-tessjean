import { SidebarLayout } from '@components/common'
import { Sidebar, useUI } from '@components/ui'
import classNames from 'classnames'
import Link from 'next/link'
import React, { useEffect } from 'react'
interface Props {
  tags: string[]
  title?: string
  currentTag?: string
}

const BlogSidebar: React.FC<Props> = ({
  tags,
  title = 'JOURNAL',
  currentTag,
}) => {
  const { displaySidebar, closeSidebar, modalView, setModalView } = useUI()
  useEffect(() => {
    setModalView('BLOG')
  }, [])
  return (
    <Sidebar
      position="left"
      open={displaySidebar && modalView === 'BLOG'}
      onClose={closeSidebar}
    >
      <SidebarLayout title={title}>
        <div className="space-y-md flex flex-col">
          <Link href={`/blog/journal`}>
            <a
              className={classNames('text-h7 hover:underline uppercase ', {
                'text-primary': !!currentTag,
              })}
            >
              all
            </a>
          </Link>
          {tags.map((str) => (
            <Link key={str} href={`/blog/journal/${str.toLowerCase()}`}>
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
      </SidebarLayout>
    </Sidebar>
  )
}
export default BlogSidebar
