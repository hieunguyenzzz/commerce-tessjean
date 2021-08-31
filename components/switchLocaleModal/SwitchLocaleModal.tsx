import Loading from '@components/common/Loading'
import { Modal } from '@components/ui'
import { getCurrentLocale } from '@lib/locale'
import dynamic from 'next/dynamic'
import React from 'react'
const dynamicProps = {
  loading: () => <Loading />,
}
const SwitchLocale = dynamic(() => import('./SwitchLocale'), dynamicProps)
const SwitchLocaleModal: React.FC<{
  fromCurrencyCode: any
  toCurrencyCode: any
  open: any
  onSubmit: any
  onClose: any
}> = ({ fromCurrencyCode, toCurrencyCode, open, onClose, onSubmit }: any) => {
  const fromCurrentLocale = getCurrentLocale(fromCurrencyCode)
  const toCurrentLocale = getCurrentLocale(toCurrencyCode)
  return (
    <Modal open={open} onClose={onClose}>
      <SwitchLocale
        {...{ fromCurrencyCode, toCurrencyCode, onSubmit, onClose }}
      />
    </Modal>
  )
}
export default SwitchLocaleModal
