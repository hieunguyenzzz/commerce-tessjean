import { Back, Down } from '@components/icons'
import { Container } from '@components/ui'
import { useUI } from '@components/ui/context'
import { getCurrencySymbol } from '@lib/currency'
import { useCurrency } from '@lib/hooks/useCurrency'
import { currencyList } from '@lib/locale'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { FC, ReactNode } from 'react'
import s from './SidebarLayout.module.css'
interface Props {
  className?: string
  title?: string | ReactNode
  icon?: ReactNode
}
const SidebarLayout: FC<Props> = ({
  children,
  className,
  title = 'Tess Jean',
  icon = (
    <div className="mx-[-8px] pr-[8px]">
      <Back />
    </div>
  ),
}) => {
  const { closeSidebar } = useUI()
  const handleClose = () => closeSidebar()
  const { currency, setCurrency } = useCurrency()

  const router = useRouter()
  const symbol = getCurrencySymbol(currency as string)
  return (
    <div className={cn(s.root, className)}>
      <header>
        <Container className="flex justify-between space-x-3 items-center">
          <div className="w-full border-b border-black">
            <div className="flex items-center py-[11px] ">
              <button
                onClick={handleClose}
                aria-label="Close panel"
                className="hover:text-gray-500 transition ease-in-out duration-150 text-[24px] flex-1"
              >
                {icon}
              </button>
              <div className="w-full text-[14px] px-[10px] text-center uppercase">
                {title}
              </div>
              <div className="w-[24px] flex-shrink-0">
                <div />
              </div>
            </div>
          </div>
        </Container>
      </header>
      <Container className={cn(s.content)}>
        {children}
        <div className="flex-1 p-6"></div>
        <div className="flex justify-start">
          <div className="group flex items-center relative">
            <div className="text-h7">
              GLOBAL (${symbol}
              {currency}){' '}
            </div>
            <span>
              <Down />
            </span>
            <div className="hidden absolute bottom-0 min-w-full left-0 shadow-lg group-hover:flex flex-col bg-accents-1 py-2 z-10">
              {currencyList
                .filter((str: string) => str !== currency)
                .map((item: any, i) => {
                  {
                    if (!item || !item.length) return null
                    return (
                      <a
                        key={i}
                        onClick={() => setCurrency(item)}
                        className="leading-extra-loose flex flex-col items-start py-1 hover:bg-accents-2  px-md"
                      >
                        <div
                          className={cn(
                            'inline-block truncate',
                            currency === item && 'text-primary'
                          )}
                        >
                          {item}
                        </div>
                      </a>
                    )
                  }
                })}
            </div>
          </div>
        </div>
        <div
          className="h-40"
          style={{ height: 'var(--safe-area-inset-bottom)', width: '100%' }}
        />
      </Container>
    </div>
  )
}

export default SidebarLayout
