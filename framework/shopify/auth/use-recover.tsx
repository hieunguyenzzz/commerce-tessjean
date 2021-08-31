import useRecover, { UseRecover } from '@commerce/auth/use-recover'
import { CommerceError } from '@commerce/utils/errors'
import type { MutationHook } from '@commerce/utils/types'
import { useCallback } from 'react'
import useCustomer from '../customer/use-customer'
import { Mutation, MutationCustomerRecoverArgs } from '../schema'
import { throwUserErrors } from '../utils'
import { customerRecoverMutation } from '../utils/mutations'

export default useRecover as UseRecover<typeof handler>

export const handler: MutationHook<
  null,
  {},
  MutationCustomerRecoverArgs,
  MutationCustomerRecoverArgs
> = {
  fetchOptions: {
    query: customerRecoverMutation,
  },
  async fetcher({ input: { email }, options, fetch }) {
    if (!email) {
      throw new CommerceError({
        message: 'A email are required',
      })
    }

    const { customerRecover } = await fetch<
      Mutation,
      MutationCustomerRecoverArgs
    >({
      ...options,
      variables: {
        email,
      },
    })

    throwUserErrors(customerRecover?.customerUserErrors)

    return null
  },
  useHook: ({ fetch }) => () => {
    const { revalidate } = useCustomer()

    return useCallback(
      async function recover(input) {
        const data = await fetch({ input })
        await revalidate()
        return data
      },
      [fetch, revalidate]
    )
  },
}
