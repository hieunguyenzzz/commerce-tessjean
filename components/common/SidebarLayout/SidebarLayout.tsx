import { UserNav } from '@components/common'
import { Cross } from '@components/icons'
import { Container } from '@components/ui'
import { useUI } from '@components/ui/context'
import cn from 'classnames'
import { FC } from 'react'
import s from './SidebarLayout.module.css'
interface Props {
  className?: string
}
const SidebarLayout: FC<Props> = ({ children, className }) => {
  const { closeSidebar } = useUI()
  const handleClose = () => closeSidebar()
  return (
    <div className={cn(s.root, className)}>
      <header>
        <Container className="flex justify-between space-x-3 items-center h-header">
          <div className="h-7 flex items-center">
            <button
              onClick={handleClose}
              aria-label="Close panel"
              className="hover:text-gray-500 transition ease-in-out duration-150"
            >
              <Cross className="h-6 w-6" />
            </button>
          </div>
          <div className="space-y-1">
            <UserNav />
          </div>
        </Container>
      </header>
      <div className={cn(s.content)}>
        {children}
        <div
          className="h-40"
          style={{ height: 'var(--safe-area-inset-bottom)', width: '100%' }}
        />
      </div>
    </div>
  )
}

export default SidebarLayout
