import cn from 'classnames'
import React, {
  ButtonHTMLAttributes,
  forwardRef,
  JSXElementConstructor,
  useRef,
} from 'react'
import mergeRefs from 'react-merge-refs'
import { LoadingDots } from '..'
import s from './Button.module.css'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  secondary?: boolean
  small?: boolean
  className?: string
  variant?: 'flat' | 'slim' | 'link' | 'ghost'
  active?: boolean
  type?: 'submit' | 'reset' | 'button'
  Component?: string | JSXElementConstructor<any>
  width?: string | number
  loading?: boolean
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = forwardRef((props, buttonRef) => {
  const {
    className,
    small,
    variant = 'flat',
    children,
    active,
    width,
    loading = false,
    disabled = false,
    style = {},
    secondary,
    Component = 'button',
    ...rest
  } = props
  const ref = useRef<typeof Component>(null)

  const rootClassName = cn(
    s.root,
    {
      [s.secondary]: secondary,
      [s.small]: small,
      [s.slim]: variant === 'slim',
      [s.link]: variant === 'link',
      [s.ghost]: variant === 'ghost',
      [s.loading]: loading,
      [s.disabled]: disabled,
    },
    className
  )

  return (
    <Component
      aria-pressed={active}
      data-variant={variant}
      ref={mergeRefs([ref, buttonRef])}
      className={rootClassName}
      disabled={disabled}
      style={{
        width,
        ...style,
      }}
      {...rest}
    >
      {children}
      {loading && (
        <i className="pl-2 m-0 flex">
          <LoadingDots />
        </i>
      )}
    </Component>
  )
})

export default Button
