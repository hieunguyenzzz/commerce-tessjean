import { Breadcrumb } from '@components/common'
import { Button, Text } from '@components/ui'
import useReset from '@framework/auth/use-reset'
import Link from 'next/link'
import { FC, useCallback, useEffect, useState } from 'react'
import { Input } from './Form'
import { handleOnInputChange } from './Form/helpers'
import Layout from './Layout'

interface Props {
  customerId: string
  resetToken: string
}

const ResetView: FC<Props> = ({ customerId, resetToken }) => {
  // Form State
  const [resetNumber, setResetNumber] = useState(0)
  const [success, setSuccess] = useState(false)
  const [password, setpassword] = useState('')
  const [confirmpassword, setconfirmpassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [dirty, setDirty] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const reset = useReset()

  const handleSubmit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()
    if (!dirty && !disabled) {
      setDirty(true)
      handleValidation()
    }
    try {
      setMessage('')
      setLoading(true)
      await reset({
        id: window.btoa(`gid://shopify/Customer/${customerId}`),
        input: {
          password,
          resetToken,
        },
      })
      setSuccess(true)
      setLoading(false)
    } catch ({ errors }) {
      setMessage(errors[0].message)
    } finally {
      setLoading(false)
      setDisabled(false)
    }
  }

  const handleValidation = useCallback(() => {
    if (dirty) {
      if (password !== confirmpassword) {
        setMessage('Your password and confirmation password do not match.')
      }
    }
  }, [dirty, password, confirmpassword])

  useEffect(() => {
    handleValidation()
  }, [handleValidation])

  return (
    <Layout>
      <div className="w-full flex flex-col items-center">
        <div className="pt-md w-full">
          <Breadcrumb>ACCOUNT/ Reset</Breadcrumb>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-sm w-full flex flex-col justify-between"
        >
          <div className="flex justify-center py-12 capitalize">
            <Text variant="h4">reset your password?</Text>
          </div>
          <div className="flex flex-col space-y-8">
            {message && (
              <div className="text-red-600 border border-red-600 p-3">
                {message}
              </div>
            )}
            {success ? (
              <div className="text-blue-600 border border-blue-600 p-3">
                your password had changed
              </div>
            ) : (
              <>
                <Input
                  required
                  type="password"
                  placeholder="New password"
                  onChange={handleOnInputChange(setpassword)}
                />
                <Input
                  required
                  type="password"
                  placeholder="Confirm password"
                  onChange={handleOnInputChange(setconfirmpassword)}
                />
                <div className="space-y-2 flex flex-col">
                  <Button
                    className="block w-full"
                    type="submit"
                    loading={loading}
                    disabled={disabled}
                  >
                    Send
                  </Button>
                </div>
              </>
            )}
            <div className="space-y-2 flex flex-col">
              <Link href="/account/login">
                <Button variant="ghost" className="block w-full">
                  return to login
                </Button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default ResetView
