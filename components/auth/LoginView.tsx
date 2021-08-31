import { Breadcrumb } from '@components/common'
import { Button, Text } from '@components/ui'
import useLogin from '@framework/auth/use-login'
import { validate } from 'email-validator'
import Link from 'next/link'
import { FC, useCallback, useEffect, useState } from 'react'
import { Input } from './Form'
import { handleOnInputChange } from './Form/helpers'
import Layout from './Layout'

interface Props {}

const LoginView: FC<Props> = () => {
  // Form State
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [dirty, setDirty] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const login = useLogin()

  const handleLogin = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()

    if (!dirty && !disabled) {
      setDirty(true)
      handleValidation()
    }

    try {
      setLoading(true)
      setMessage('')
      await login({
        email,
        password,
      })
      setLoading(false)
    } catch ({ errors }) {
      setMessage(errors[0].message)
    } finally {
      setLoading(false)
      setDisabled(false)
    }
  }

  const handleValidation = useCallback(() => {
    // Test for Alphanumeric password
    const validPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)

    // Unable to send form unless fields are valid.
    // if (dirty) {
    //   setDisabled(!validate(email) || password.length < 7 || !validPassword)
    // }
    if (dirty) {
      setDisabled(!validate(email))
    }
  }, [email, password, dirty])

  useEffect(() => {
    handleValidation()
  }, [handleValidation])

  return (
    <Layout>
      <div className="w-full flex flex-col items-center">
        <div className="pt-md w-full">
          <Breadcrumb>ACCOUNT/ SIGN IN</Breadcrumb>
        </div>

        <form
          onSubmit={handleLogin}
          className="max-w-sm w-full flex flex-col justify-between"
        >
          <div className="flex justify-center py-12">
            <Text variant="h4">sign in</Text>
          </div>
          <div className="flex flex-col space-y-8">
            {message && (
              <div className="text-red-600 border border-red-600 p-3">
                {message}. Did you {` `}
                <Link href="/account/recovery">
                  <a className="text-accent-9 inline font-bold hover:underline cursor-pointer">
                    forgot your password?
                  </a>
                </Link>
              </div>
            )}
            <Input
              required
              type="email"
              placeholder="Email address"
              onChange={handleOnInputChange(setEmail)}
            />
            <Input
              required
              type="password"
              placeholder="Password"
              onChange={handleOnInputChange(setPassword)}
            />
            <div className="space-y-2 flex flex-col">
              <Link href="/account/recovery">
                <a className="text-accents-7 underline uppercase hover:underline font-montserrat text-xs">
                  Forgot your password?
                </a>
              </Link>
              <Button
                className="block w-full"
                type="submit"
                loading={loading}
                disabled={disabled}
              >
                Sign in
              </Button>
            </div>
            <div className="space-y-2 flex flex-col">
              <span className="text-accents-7 uppercase font-montserrat text-xs">
                NOT REGISTERED?
              </span>
              <Link href="/account/register">
                <Button secondary className="block w-full">
                  REGISTER NOW
                </Button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default LoginView
