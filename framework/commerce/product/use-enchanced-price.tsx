import usePrice from '@framework/product/use-price'
import { useCurrency } from '@lib/hooks/useCurrency'

export default function useEnchancedPrice(
  data?: {
    baseCurrency?: string
    amount: number
    baseAmount?: number
  } | null
) {
  const { amount = 0, baseAmount, baseCurrency = 'USD' } = data ?? {}
  const { currency, convert } = useCurrency(baseCurrency)
  const { price } = usePrice(
    data
      ? ({
          amount: convert(amount),
          baseAmount: baseAmount && convert(baseAmount),
          currencyCode: currency,
        } as any)
      : null
  )
  return { price, convert, currency }
}
