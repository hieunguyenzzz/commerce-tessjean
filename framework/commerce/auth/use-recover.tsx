import type { Provider } from '..'
import { mutationFetcher } from '../utils/default-fetcher'
import type { HookFetcherFn, MutationHook } from '../utils/types'
import { useHook, useMutationHook } from '../utils/use-hook'

export type UseRecover<
  H extends MutationHook<any, any, any> = MutationHook<null>
> = ReturnType<H['useHook']>

export const fetcher: HookFetcherFn<null> = mutationFetcher

const fn = (provider: Provider) => provider.auth?.useRecover!

const useRecover: UseRecover = (...args) => {
  const hook = useHook(fn)
  return useMutationHook({ fetcher, ...hook })(...args)
}

export default useRecover
