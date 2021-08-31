import { Button } from '@components/ui'
import useSubscribe from '@lib/hooks/useSubscribe'
import { validate } from 'email-validator'
import { FC, useCallback, useEffect, useState } from 'react'
import { Input } from './Form'
import { handleOnInputChange } from './Form/helpers'

const KeepInTouch: FC<{ onNothank: () => void }> = ({ onNothank }) => {
  const [email, setEmail] = useState('')
  const [birthday, setBirthday] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [dirty, setDirty] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [success, setSuccess] = useState(false)
  const subscribe = useSubscribe()
  // const { _, closeModal } = useUI()
  const closeModal = onNothank
  const handleSignup = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()
    if (!dirty && !disabled) {
      setDirty(true)
      handleValidation()
    }
    try {
      setLoading(true)
      setMessage('')
      await subscribe({
        email,
        firstName,
        lastName,
        birthday,
      })
      setLoading(false)
      // closeModal()
    } catch ({ errors }) {
      console.log(errors)
      setMessage(errors[0].message)
      setLoading(false)
    } finally {
      setSuccess(true)
    }
  }

  const handleValidation = useCallback(() => {
    if (dirty) {
      setDisabled(!validate(email))
    }
  }, [email, birthday, dirty])

  useEffect(() => {
    handleValidation()
  }, [handleValidation])

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex flex-col justify-between">
        {!success ? (
          <form onSubmit={handleSignup}>
            <div className="pb-[30px] lg:pb-12 text-center ">
              <h4 className="text-[20px] lg:text-h4">KEEP IN TOUCH</h4>
              <div className="mt-5 text-[14px]">
                Subcribe to our newsletter to receive 10% your first order and
                be the first to hear about lasted news and offer latest news and
                offers.
              </div>
            </div>
            <div className="flex flex-col space-y-4 lg:space-y-8">
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
                placeholder="Email address"
                onChange={handleOnInputChange(setEmail)}
              />
              <Input
                required
                placeholder="Birthday"
                onChange={handleOnInputChange(setBirthday)}
              />
            </div>
            <div className="space-y-3 flex flex-col mt-10">
              <Button
                className="block w-full"
                type="submit"
                loading={loading}
                disabled={disabled}
              >
                SUBCRIBE
              </Button>
              <Button
                variant="ghost"
                className="block w-full"
                onClick={onNothank}
              >
                NO THANKS
              </Button>
            </div>
          </form>
        ) : (
          <div>
            <div className="pb-[30px] lg:pb-12 text-center ">
              <h4 className="text-[20px] lg:text-h4">
                Thanks for subscribing!
              </h4>
            </div>
            <div className="flex justify-center">
              <Button
                onClick={() => {
                  setTimeout(() => {
                    closeModal()
                  })
                }}
              >
                RETURN
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default KeepInTouch
