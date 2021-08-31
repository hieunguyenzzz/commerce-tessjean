import { handler as useLogin } from './auth/use-login'
import { handler as useLogout } from './auth/use-logout'
import { handler as useRecover } from './auth/use-recover'
import { handler as useReset } from './auth/use-reset'
import { handler as useSignup } from './auth/use-signup'
import { handler as useAddItem } from './cart/use-add-item'
import { handler as useCart } from './cart/use-cart'
import { handler as useRemoveItem } from './cart/use-remove-item'
import { handler as useUpdateItem } from './cart/use-update-item'
import { SHOPIFY_CHECKOUT_ID_COOKIE } from './const'
import { handler as useCustomer } from './customer/use-customer'
import fetcher from './fetcher'
import { handler as useSearch } from './product/use-search'

export const shopifyProvider = {
  locale: 'en-us',
  cartCookie: SHOPIFY_CHECKOUT_ID_COOKIE,
  fetcher,
  cart: { useCart, useAddItem, useUpdateItem, useRemoveItem },
  customer: { useCustomer },
  products: { useSearch },
  auth: { useLogin, useLogout, useSignup, useRecover, useReset },
}

export type ShopifyProvider = typeof shopifyProvider
