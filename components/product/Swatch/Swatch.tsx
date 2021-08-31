import { Check } from '@components/icons'
import { ButtonProps } from '@components/ui/Button'
import { isDark } from '@lib/colors'
import cn from 'classnames'
import { FC } from 'react'
import s from './Swatch.module.css'
interface Props {
  active?: boolean
  children?: any
  className?: string
  label?: string
  variant?: 'size' | 'color' | string
  color?: string
  disabled?: boolean
}

const Swatch: FC<Omit<ButtonProps, 'variant'> & Props> = ({
  className,
  color = '',
  label,
  variant = 'size',
  active,
  disabled,
  ...props
}) => {
  variant = variant?.toLowerCase()
  label = label?.toLowerCase()

  const rootClassName = cn(
    s.root,
    {
      [s.active]: active,
      [s.disabled]: disabled,
      [s.size]: variant === 'size',
      [s.color]: color,
      [s.dark]: color ? isDark(color) : false,
    },
    className
  )
  const title = `${variant} ${label}`
  return (
    <button
      title={title}
      className={rootClassName}
      style={color ? { backgroundColor: color } : {}}
      aria-label={title}
      {...props}
    >
      {variant === 'color' && (
        <span className={cn(s.icon, !active && 'invisible')}>
          <Check />
        </span>
      )}
      {variant === 'size' && label ? label : null}
    </button>
  )
}

export default Swatch
