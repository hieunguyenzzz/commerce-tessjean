import { Breadcrumb } from '@components/common'
import { Button, Text } from '@components/ui'
import { useUI } from '@components/ui/context'
import useSignup from '@framework/auth/use-signup'
import useSubscribe from '@lib/hooks/useSubscribe'
import { validate } from 'email-validator'
import Link from 'next/link'
import { FC, useCallback, useEffect, useState } from 'react'
import { Input } from './Form'
import { handleOnCheckoxChange, handleOnInputChange } from './Form/helpers'
import Layout from './Layout'

interface Props {}

const RegisterView: FC<Props> = () => {
  const [email, setEmail] = useState('')
  const [acceptsMarketing, setacceptsMarketing] = useState(false)
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [dirty, setDirty] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const signup = useSignup()
  const { setModalView, closeModal } = useUI()

  const subscribe = useSubscribe()
  const handleSignup = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()
    if (!dirty && !disabled) {
      setDirty(true)
      handleValidation()
    }
    try {
      setLoading(true)
      setMessage('')
      await signup({
        email,
        firstName,
        lastName,
        password,
        acceptsMarketing,
      })
      setLoading(false)
      closeModal()
    } catch ({ errors }) {
      setMessage(errors[0].message)
      setLoading(false)
    }
  }

  const handleValidation = useCallback(() => {
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
          <Breadcrumb>ACCOUNT/ REGISTER</Breadcrumb>
        </div>
        <form
          onSubmit={handleSignup}
          className="max-w-sm w-full flex flex-col justify-between"
        >
          <div className="flex justify-center py-12">
            <Text variant="h4">REGISTER</Text>
          </div>
          <div className="flex flex-col space-y-8">
            {message && (
              <div className="text-red-600 border border-red-600 p-3">
                {message}. Did you {` `}
                <a
                  className="text-accent-9 inline font-bold hover:underline cursor-pointer"
                  onClick={() => setModalView('FORGOT_VIEW')}
                >
                  forgot your password?
                </a>
              </div>
            )}
            <Input
              required
              placeholder="First Name"
              onChange={handleOnInputChange(setFirstName)}
            />
            <Input
              required
              placeholder="Last Name"
              onChange={handleOnInputChange(setLastName)}
            />
            <Input
              required
              type="email"
              placeholder="Email"
              onChange={handleOnInputChange(setEmail)}
            />
            <Input
              required
              type="password"
              placeholder="Password"
              onChange={handleOnInputChange(setPassword)}
            />
            <div className="space-y-3 flex flex-col">
              <label
                onClick={() => {
                  if (acceptsMarketing && validate(email)) {
                    subscribe({
                      email,
                    })
                  }
                }}
              >
                <input
                  name="acceptsMarketing"
                  type="checkbox"
                  onChange={handleOnCheckoxChange((checked) => {
                    setacceptsMarketing(checked)
                    if (checked && validate(email)) {
                      subscribe({
                        email,
                      })
                    }
                  })}
                />
                <div>
                  Sign up to the TessJean newsletter and receive 10% off your
                  first purchase by signing up you agree to TessJean Terms of
                  Service and Privacy Policy
                </div>
              </label>
              <Button
                className="block w-full"
                type="submit"
                loading={loading}
                disabled={disabled}
              >
                REGISTER
              </Button>
            </div>
            <div className="space-y-2 flex flex-col">
              <span className="text-accents-7 uppercase font-montserrat text-xs">
                ALREADY SIGNED UP?
              </span>
              <Link href="/account/login">
                <Button secondary className="block w-full">
                  sign in
                </Button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default RegisterView
