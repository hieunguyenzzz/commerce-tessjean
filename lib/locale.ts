import getConfig from 'next/config'

export const currencyList = [
  'USD',
  'EUR',
  'GBP',
  'CAD',
  'JPY',
  'SGD',
  'CNY',
  'NZD',
  'AUD',
  'VND',
]
const {
  publicRuntimeConfig: { sites },
} = getConfig()
export const currencyLocalMap = {
  default: sites.international,
  NZD: sites.nz,
  AUD: sites.nz,
}
export type CurrencyCodeType = 'default' | 'NZD' | 'AUD'
export const getCurrentLocale = (currency: CurrencyCodeType) =>
  currencyLocalMap[currency] || currencyLocalMap.default
