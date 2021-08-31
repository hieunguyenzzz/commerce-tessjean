import { SidebarLayout } from '@components/common'
import { Sidebar, useUI } from '@components/ui'
import { ReactNode } from 'react'

const SearchSidebar: React.FC<{
  children: ReactNode
  title?: string
  currentTag?: string
}> = ({ children, title = 'SHOP' }) => {
  const { displaySidebar, closeSidebar, modalView, setModalView } = useUI()
  return (
    <Sidebar
      position="left"
      open={displaySidebar && modalView === 'SEARCH'}
      onClose={closeSidebar}
    >
      <SidebarLayout title={title}>{children}</SidebarLayout>
    </Sidebar>
  )
}
export default SearchSidebar
