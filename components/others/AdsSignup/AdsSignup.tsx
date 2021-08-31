import { KeepInTouch } from '@components/auth'
import { Button, Modal, Text } from '@components/ui'
import { FC, useState } from 'react'
interface Props {
  title?: string
  content?: string
}
const AdsSignupView: FC<Props> = ({
  title = '10% OFF YOUR FIRST ORDER',
  content = `Sign up to receive 10% your first order and be the first to hear about latest news and offers.`,
}) => {
  const [open, setOpen] = useState<boolean>()
  return (
    <>
      <div className="max-w-prose flex flex-col items-center text-center space-y-5 mx-auto">
        <Text variant="h3">{title}</Text>
        <div className="whitespace-pre-line text-sm md:text-body-2 max-w-md text-[14px]">
          {content}
        </div>
        <Button onClick={() => setOpen(true)}>sign up</Button>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="max-w-full w-[520px] py-[10px] px-[13px] lg:lg:px-[50px]  lg:py-[35px]">
          <KeepInTouch onNothank={() => setOpen(false)} />
        </div>
      </Modal>
    </>
  )
}

export default AdsSignupView
