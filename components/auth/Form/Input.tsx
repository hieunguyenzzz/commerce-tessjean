import classNames from 'classnames'
import React, { InputHTMLAttributes } from 'react'
import s from './Form.module.css'
export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  onChange?: (...args: any[]) => any
}
const Input: React.FC<Props> = ({ className, placeholder, ...props }) => (
  <div className={classNames(s.inputmain, className)}>
    <div className={s.inputbox}>
      <input {...props} placeholder={placeholder} className={s.input} />
      <label aria-label={placeholder} htmlFor={props.name} className={s.label}>
        {placeholder}
      </label>
      <div className={s.inputunderline} />
    </div>
  </div>
)
export default Input
