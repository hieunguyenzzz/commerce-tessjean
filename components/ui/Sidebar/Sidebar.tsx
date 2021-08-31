import Portal from '@reach/portal'
import cn from 'classnames'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import s from './Sidebar.module.css'

interface Props {
  children: any
  open: boolean
  position?: 'left' | 'right'
  onClose: () => void
}

const Sidebar: FC<Props> = ({
  children,
  position = 'right',
  open = false,
  onClose,
}) => {
  const [ready, setReady] = useState<boolean>()
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>

  useEffect(() => {
    if (!ready && open) {
      setReady(true)
    }
  }, [open])
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        return onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (open) {
      window.addEventListener('keydown', handleKey)
    }
    return () => {
      window.removeEventListener('keydown', handleKey)
    }
  }, [open, handleKey])
  if (!ready) {
    return null
  }
  return (
    <Portal>
      {open ? (
        <div className={cn(s.root, s[position], s.open)} ref={ref}>
          {open && (
            <style>{`
            html,body{
              -webkit-overflow-scrolling: none;    touch-action: none;overflow:hidden;
            }
            body{
              padding-right:${window.innerWidth - document.body.clientWidth}px
            }
          `}</style>
          )}
          <div className={'absolute inset-0 overflow-hidden'}>
            <div
              className="absolute inset-0 bg-accents-9 opacity-50 transition-opacity"
              onClick={onClose}
            />
            <section className={s.sidebar}>{children}</section>
          </div>
        </div>
      ) : (
        <div className={cn(s.root, s[position])} ref={ref}>
          <div className={'absolute inset-0 overflow-hidden'}>
            <div className="absolute inset-0 bg-accents-9 opacity-0 transition-opacity"></div>
            <section className={cn(s.sidebar)}>{children}</section>
          </div>
        </div>
      )}
    </Portal>
  )
}

export default Sidebar
