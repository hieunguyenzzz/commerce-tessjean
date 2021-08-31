import useSignup, { UseSignup } from '@commerce/auth/use-signup'
import { CommerceError } from '@commerce/utils/errors'
import type { MutationHook } from '@commerce/utils/types'
import { useCallback } from 'react'
import useCustomer from '../customer/use-customer'
import {
  CustomerCreateInput,
  Mutation,
  MutationCustomerCreateArgs,
} from '../schema'
import { handleAutomaticLogin, throwUserErrors } from '../utils'
import { customerCreateMutation } from '../utils/mutations'

export default useSignup as UseSignup<typeof handler>

export const handler: MutationHook<
  null,
  {},
  CustomerCreateInput,
  CustomerCreateInput
> = {
  fetchOptions: {
    query: customerCreateMutation,
  },
  async fetcher({
    input: { firstName, lastName, email, password, acceptsMarketing },
    options,
    fetch,
  }) {
    if (!(firstName && lastName && email && password)) {
      throw new CommerceError({
        message:
          'A first name, last name, email and password are required to signup',
      })
    }

    const { customerCreate } = await fetch<
      Mutation,
      MutationCustomerCreateArgs
    >({
      ...options,
      variables: {
        input: {
          firstName,
          lastName,
          email,
          password,
          acceptsMarketing,
        },
      },
    })

    throwUserErrors(customerCreate?.customerUserErrors)
    await handleAutomaticLogin(fetch, { email, password })

    return null
  },
  useHook: ({ fetch }) => () => {
    const { revalidate } = useCustomer()

    return useCallback(
      async function signup(input) {
        const data = await fetch({ input })
        await revalidate()
        return data
      },
      [fetch, revalidate]
    )
  },
}
