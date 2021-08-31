import { Close } from '@components/icons'
import cn from 'classnames'
import { ReactNode } from 'react'
import s from './FeatureBar.module.css'
interface FeatureBarProps {
  className?: string
  title: string | ReactNode
  description?: string
  hide?: boolean
  action?: React.ReactNode
  onClose: () => void
}

const FeatureBar: React.FC<FeatureBarProps> = ({
  title,
  description,
  className,
  onClose,
  hide,
}) => {
  const show = !hide
  const rootClassName = cn(
    s.root,
    {
      transform: true,
      'translate-y-0 opacity-100': show,
      'translate-y-full opacity-0': !show,
    },
    className
  )
  return (
    <div className={rootClassName}>
      <div className="flex-1 text-center text-sm">
        <span className="block md:inline">{title}</span>
        {description && (
          <span className="block mb-6 md:inline md:mb-0 md:ml-2">
            {description}
          </span>
        )}
      </div>
      <button className="leading-none" onClick={onClose}>
        <Close />
      </button>
    </div>
  )
}

export default FeatureBar
