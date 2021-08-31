import React from 'react'
import s from './Breadcrumb.module.css'
const Breadcrumb: React.FC = ({ children }) => (
  <div className={s.root} data-testid="Breadcrumb">
    {children}
  </div>
)
export default Breadcrumb
