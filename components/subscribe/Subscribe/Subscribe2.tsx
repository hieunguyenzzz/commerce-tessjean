import { Title } from '@components/common'
import { Button } from '@components/ui'
import React from 'react'
const Subscribe: React.FC = () => (
  <div className="flex flex-col space-y-5" data-testid="Subscribe">
    <div>
      <Title small>Join Our List</Title>
    </div>
    <div className="text-sm leading-loose inline bg-white bg-opacity-30">
      Signup to be the first to hear about exclusive deals, special offers and
      upcoming collections
    </div>
    <div className="flex-1 flex flex-col space-y-3">
      <input
        type="email"
        placeholder="Your email address"
        className="w-full text-sm py-4 px-5 border-black bg-accents-0 border-2 rounded-none hover:shadow-inner focus:shadow-inner"
      ></input>
      <Button className="w-full">Subscribe</Button>
    </div>
  </div>
)
export default Subscribe
