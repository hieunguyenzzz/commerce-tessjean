import SwitchLocaleModal from '@components/switchLocaleModal'
import { useOpenDynamicModal } from '@components/ui/context'
import { convert } from 'lib/currency'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { CurrencyCodeType, currencyLocalMap } from '../locale'
const {
  serverRuntimeConfig: { sites },
} = getConfig()
export const useCurrency = (baseCurrency = 'USD') => {
  const { query, isReady, pathname, asPath, push, locale } = useRouter()
  const { open, onClose } = useOpenDynamicModal()
  const currency =
    query.currency ||
    (isReady && localStorage.getItem('currency')) ||
    baseCurrency

  useEffect(() => {
    isReady && localStorage.setItem('currency', currency as string)
  }, [currency, isReady])

  return {
    currency,
    convert: (amount: number) => {
      return convert(amount, baseCurrency as any, currency as any)
    },
    setCurrency: (item: CurrencyCodeType) => {
      const selectLocale = currencyLocalMap[item] || currencyLocalMap.default
      const urlObject = {
        pathname: pathname,
        query: {
          ...query,
          currency: item,
        },
      }
      if (locale !== selectLocale.locale) {
        return setTimeout(() => {
          open(
            <SwitchLocaleModal
              {...{
                open: true,
                onClose: onClose,
                fromCurrencyCode: currency,
                toCurrencyCode: item,
                onSubmit: () => {
                  push(urlObject, urlObject, {
                    scroll: false,
                    locale: selectLocale.locale,
                  })
                },
              }}
            />
          )
        })
      } else {
        return push(urlObject, urlObject, {
          scroll: false,
        })
      }
    },
  }
}
