import useReset, { UseReset } from '@commerce/auth/use-reset'
import type { MutationHook } from '@commerce/utils/types'
import { useCallback } from 'react'
import useCustomer from '../customer/use-customer'
import { Mutation, MutationCustomerResetArgs } from '../schema'
import { throwUserErrors } from '../utils'
import { customerResetMutation } from '../utils/mutations'

export default useReset as UseReset<typeof handler>

export const handler: MutationHook<
  null,
  {},
  MutationCustomerResetArgs,
  MutationCustomerResetArgs
> = {
  fetchOptions: {
    query: customerResetMutation,
  },
  async fetcher({
    input: {
      id,
      input: { password, resetToken },
    },
    options,
    fetch,
  }) {
    const { customerReset } = await fetch<Mutation, MutationCustomerResetArgs>({
      ...options,
      variables: {
        id: id,
        input: {
          password,
          resetToken,
        },
      },
    })

    throwUserErrors(customerReset?.customerUserErrors)
    // const customerAccessToken = customerReset?.customerAccessToken
    // const accessToken = customerAccessToken?.accessToken
    // if (accessToken) {
    //   setCustomerToken(accessToken)
    // }

    return null
  },
  useHook: ({ fetch }) => () => {
    const { revalidate } = useCustomer()

    return useCallback(
      async function reset(input) {
        const data = await fetch({ input })
        await revalidate()
        return data
      },
      [fetch, revalidate]
    )
  },
}
