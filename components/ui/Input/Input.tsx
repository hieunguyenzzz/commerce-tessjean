import { Down } from '@components/icons'
import cn from 'classnames'
import React, { InputHTMLAttributes } from 'react'
import s from './Input.module.css'
export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  onChange?: (...args: any[]) => any
}

const Input: React.FC<Props> = (props) => {
  const { className, type = 'text', children, onChange, ...rest } = props

  const rootClassName = cn(s.root, {}, className)

  const handleOnChange = (e: any) => {
    if (onChange) {
      onChange(e.target.value)
    }
    return null
  }
  if (type === 'select') {
    return (
      <div className={cn(rootClassName, 'relative')}>
        <select
          className={cn(
            'appearance-none bg-transparent block pr-12 block',
            'focus:outline-none '
          )}
          onChange={handleOnChange}
          children={children}
        ></select>
        <div className="absolute right-0 top-0 bottom-0 w-10 flex items-center justify-center">
          <Down />
        </div>
      </div>
    )
  }
  return (
    <input
      className={rootClassName}
      onChange={handleOnChange}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
      {...rest}
    />
  )
}

export default Input
