import { Layout } from '@components/common'
import CustomercareLayout from '@components/sections/customer-care/Layout'
import { Button } from '@components/ui'
import { getConfig } from '@framework/api'
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { default as React } from 'react'

export async function getStaticProps({
  locale,
  preview,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })
  return {
    props: {},
    revalidate: 14400,
  }
}

export default function ContactUs({}: InferGetStaticPropsType<
  typeof getStaticProps
>) {
  return (
    <CustomercareLayout title="contact us" activeslug="contact-us">
      <div>
        {`We would love to hear from you. Please reach out to us for any questions, style advice or any other general enquires.
        
          hello@tessjean.com
          +84 077 277 0802
          Customer care hours:
          Monday - Friday 8:00am - 4:30pm ICT
        `}
      </div>
      <div className="whitespace-pre-line mt-lg">
        <form
          method="post"
          action="https://testjeantesting.myshopify.com/contact#contact_form"
          id="contact_form"
          acceptCharset="UTF-8"
          className="contact-form flex flex-col space-y-xs"
        >
          <input
            required
            type="hidden"
            name="form_type"
            defaultValue="contact"
          />
          <input type="hidden" name="utf8" defaultValue="✓" />
          <input
            placeholder="name"
            className="py-xs px-sm border border-accents-6"
            type="text"
            id="ContactFormName"
            name="contact[name]"
          />
          <input
            placeholder="email"
            required
            className="py-xs px-sm border border-accents-6"
            type="email"
            id="ContactFormEmail"
            name="contact[email]"
          />
          <input
            placeholder="phone number"
            required
            className="py-xs px-sm border border-accents-6"
            type="tel"
            id="ContactFormPhone"
            name="contact[phone]"
          />
          <textarea
            className="py-xs px-sm border border-accents-6"
            placeholder="message"
            required
            rows={10}
            id="ContactFormMessage"
            name="contact[body]"
            defaultValue={''}
          />
          <Button type="submit" className="self-end">
            Send
          </Button>
        </form>
      </div>
    </CustomercareLayout>
  )
}
ContactUs.Layout = Layout
