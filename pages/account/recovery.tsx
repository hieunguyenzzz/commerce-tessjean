import RecoveryView from '@components/auth/RecoverView'
import { Layout } from '@components/common'
import { getConfig } from '@framework/api'
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
function Recovery(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const customer = useCustomer()
  useEffect(() => {
    if (customer?.data) {
      router.replace('/')
    }
  }, [customer])
  return <RecoveryView />
}

export default Recovery

Recovery.Layout = Layout
