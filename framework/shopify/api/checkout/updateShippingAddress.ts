import { getConfig } from '..'
import { SHOPIFY_CHECKOUT_ID_COOKIE } from '../../const'
import createApiHandler, {
  ShopifyApiHandler,
} from '../utils/create-api-handler'
import isAllowedMethod from '../utils/is-allowed-method'

const METHODS = ['GET', 'POST']

const mutation = `mutation checkoutShippingAddressUpdateV2($shippingAddress: MailingAddressInput!, $checkoutId: ID!) {
  checkoutShippingAddressUpdateV2(
    shippingAddress: $shippingAddress
    checkoutId: $checkoutId
  ) {
    checkout {
      id
    }
    checkoutUserErrors {
      code
      field
      message
    }
  }
}`

const updateShippingAddress: ShopifyApiHandler<any> = async (
  req,
  res,
  config
) => {
  if (!isAllowedMethod(req, res, METHODS)) return

  config = getConfig()

  const { cookies } = req
  try {
    await config.fetch(mutation, {
      variables: {
        checkoutId: cookies[SHOPIFY_CHECKOUT_ID_COOKIE],
        shippingAddress: {},
      },
    })
  } catch (error) {
    console.error(error)
  }
}

export default createApiHandler(updateShippingAddress, {}, {})
