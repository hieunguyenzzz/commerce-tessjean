import { SidebarLayout } from '@components/common'
import { Sidebar, useUI } from '@components/ui'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
interface Props {
  categories?: {
    label: string
    getHref: () => string
  }[]
  title?: string
  modalViewKey?: string
  currentTag?: string
}

const CollectionSidebar: React.FC<Props> = ({
  modalViewKey = 'COLLECTION',
  categories = [],
  title = 'COLLECTION',
  currentTag,
}) => {
  const { displaySidebar, closeSidebar, modalView, setModalView } = useUI()
  return (
    <Sidebar
      position="left"
      open={displaySidebar && modalView === modalViewKey}
      onClose={closeSidebar}
    >
      <SidebarLayout title={title}>
        <div className="flex flex-col pt-[41px] space-y-[41px]">
          <Link href={'/collections/001-softtest'}>
            <div className="self-end">
              <Image
                width="160"
                height="170"
                objectFit="cover"
                layout="fixed"
                src={'/blog/journal-1.jpg'}
              ></Image>
              <div className="text-h6 py-[14px]  uppercase">001 sofflines</div>
            </div>
          </Link>
          <Link href={'/collections/002-la-mar'}>
            <div className="self-start">
              <Image
                width="160"
                height="170"
                objectFit="cover"
                layout="fixed"
                src={'/blog/journal-2.jpg'}
              ></Image>
              <div className="text-h6 py-[14px] uppercase">002 la mar</div>
            </div>
          </Link>
        </div>
      </SidebarLayout>
    </Sidebar>
  )
}
export default CollectionSidebar
