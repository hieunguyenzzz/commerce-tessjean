import { Breadcrumb } from '@components/common'
import { Container } from '@components/ui'
import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'
const CustomercareLayout = ({
  title = 'others',
  activeslug,
  children,
  customercare = [
    { title: 'SHIPPING', slug: 'shipping' },
    { title: 'RETURNS', slug: 'returns' },
    { title: 'ORDERING', slug: 'ordering' },
    { title: 'GARMENT CARE', slug: 'garment-care' },
    { title: 'SIZE GUIDE', slug: 'size-guide' },
    { title: 'ETHICS', slug: 'ethics' },
    { title: 'FAQS', slug: 'faqs' },
    { title: 'CONTACT US', slug: 'contact-us' },
  ],
}: any = {}) => {
  return (
    <Container>
      <div className="pt-md mb-6">
        <Breadcrumb>Cusomer care/ {title}</Breadcrumb>
      </div>
      <h4 className="text-h4 py-lg">customer care</h4>
      <div className="w-full flex">
        <div className="hidden w-1/4 md:flex flex-col items-start space-y-5 pr-md border-r border-black">
          {customercare.map(({ title: str, slug }: any) => (
            <Link href={'/pages/' + slug}>
              <a
                className={classNames(
                  'text-effect-1 py-1',
                  slug === activeslug && 'text-primary'
                )}
              >
                {str}
              </a>
            </Link>
          ))}
        </div>
        <div className="flex-1 md:pl-[90px] pb-[90px]">
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="header-1 font-bold uppercase">{title}</div>
            <div className="whitespace-pre-line">{children}</div>
          </div>
        </div>
      </div>
    </Container>
  )
}
export default CustomercareLayout
