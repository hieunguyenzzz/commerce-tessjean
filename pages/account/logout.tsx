import { Layout } from '@components/common'
import { LoadingDots } from '@components/ui'
import { getConfig } from '@framework/api'
import useLogout from '@framework/auth/use-logout'
import getAllPages from '@framework/common/get-all-pages'
import { useCustomer } from '@framework/customer'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })
  const { pages } = await getAllPages({ config, preview })
  return {
    props: {
      pages,
    },
  }
}
function Logout(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const logout = useLogout()
  const customer = useCustomer()
  useEffect(() => {
    if (customer?.data) {
      logout()
    } else {
      router.replace('/')
    }
  }, [customer])

  return (
    <div className="m-auto fit flex flex-col w-full h-full justify-center items-center space-y-sm">
      <div>You are logging out</div>
      <LoadingDots />
    </div>
  )
}

export default Logout

Logout.Layout = Layout
