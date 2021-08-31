import { Button, Text } from '@components/ui'
import { getCurrentLocale } from '@lib/locale'
import Image from 'next/image'
import React from 'react'
const SwitchLocale: React.FC<any> = ({
  fromCurrencyCode,
  toCurrencyCode,
  onSubmit,
  onClose,
}) => {
  const fromCurrentLocale = getCurrentLocale(fromCurrencyCode)
  const toCurrentLocale = getCurrentLocale(toCurrencyCode)
  return (
    <div
      className="py-6  flex flex-col items-center space-y-8 px-6"
      data-testid="SwithLocale"
    >
      <div>
        <Image layout="intrinsic" width={113} height={125} src="/logo-2.png" />
      </div>
      <Text variant="body" className="text-center max-w-lg mx-auto">
        <span className="inline-block">
          Hi, it looks like you are visiting from outside{' '}
          {fromCurrentLocale.name}.
        </span>{' '}
        <span className="inline-block">
          You can shop at our {toCurrentLocale.name} store{' '}
          {toCurrentLocale.host}
        </span>{' '}
        for prices in your local currency and interntional shipping options.
      </Text>
      <div className="flex-1 w-full flex flex-col items-center space-y-4">
        <Button secondary onClick={onSubmit} className="block w-full">
          Take me to the {toCurrentLocale.name} store
        </Button>
        <Button onClick={onClose} className="block w-full">
          Stay on {fromCurrentLocale.name}
        </Button>
      </div>
    </div>
  )
}
export default SwitchLocale
