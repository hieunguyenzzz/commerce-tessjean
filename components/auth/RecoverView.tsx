import { Breadcrumb } from '@components/common'
import { Button, Text } from '@components/ui'
import useRecover from '@framework/auth/use-recover'
import { validate } from 'email-validator'
import Link from 'next/link'
import { FC, useCallback, useEffect, useState } from 'react'
import { Input } from './Form'
import { handleOnInputChange } from './Form/helpers'
import Layout from './Layout'

interface Props {}

const RecoveryView: FC<Props> = () => {
  // Form State
  const [resetNumber, setResetNumber] = useState(0)
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [dirty, setDirty] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const recovery = useRecover()
  useEffect(() => {
    if (resetNumber) {
      setSuccess(false)
      setMessage('')
    }
  }, [resetNumber])
  const handleSubmit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()
    if (!dirty && !disabled) {
      setDirty(true)
      handleValidation()
    }

    try {
      setResetNumber(Date.now())
      setLoading(true)
      setMessage('')
      await recovery({
        email,
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
      setDisabled(!validate(email))
    }
  }, [email, dirty])

  useEffect(() => {
    handleValidation()
  }, [handleValidation])

  return (
    <Layout>
      <div className="w-full flex flex-col items-center">
        <div className="pt-md w-full">
          <Breadcrumb>ACCOUNT/ Recovery</Breadcrumb>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-sm w-full flex flex-col justify-between"
        >
          <div className="flex justify-center py-12">
            <Text variant="h4">forgot your password?</Text>
          </div>
          <div className="flex flex-col space-y-8">
            {message && (
              <div className="text-red-600 border border-red-600 p-3">
                {message}
              </div>
            )}
            {success && <div className="border p-3">Email sent !</div>}
            <Input
              required
              type="email"
              placeholder="Recovery Email address"
              onChange={handleOnInputChange(setEmail)}
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

export default RecoveryView
