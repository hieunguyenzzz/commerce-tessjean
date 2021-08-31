import { Down } from '@components/icons'
import React, { forwardRef, HTMLAttributes } from 'react'

export interface AccordionProps extends HTMLAttributes<HTMLElement> {
  data?: any[]
}

const Accordion: React.FC<AccordionProps> = forwardRef(
  ({
    data = [
      {
        title: <span className="text-h5 capitalize ">Details</span>,
        children: (
          <div className="py-3">{`• Tiered midi dress
            • Buttercup yellow hue
            • Cotton bodice with added stretch
            • Cotton batiste skirt and sleeves
            • Shirred details
            • Scoop neckline
            • This style is lined`}</div>
        ),
      },
      {
        title: <span className="text-h5 capitalize ">Size & Fit</span>,
        children: (
          <div className="py-3">{`• Tiered midi dress
            • Buttercup yellow hue
            • Cotton bodice with added stretch
            • Cotton batiste skirt and sleeves
            • Shirred details
            • Scoop neckline
            • This style is lined`}</div>
        ),
      },
      {
        title: <span className="text-h5 capitalize ">Fabric</span>,
        children: (
          <div className="py-3">{`• Tiered midi dress
            • Buttercup yellow hue
            • Cotton bodice with added stretch
            • Cotton batiste skirt and sleeves
            • Shirred details
            • Scoop neckline
            • This style is lined`}</div>
        ),
      },
      {
        title: <span className="text-h5 capitalize ">Shipping & Returns</span>,
        children: (
          <div className="py-3">{`• Tiered midi dress
            • Buttercup yellow hue
            • Cotton bodice with added stretch
            • Cotton batiste skirt and sleeves
            • Shirred details
            • Scoop neckline
            • This style is lined`}</div>
        ),
      },
    ],
  }) => {
    return (
      <div className="space-y-md  pointer-events-none">
        {data.map(({ title, children }) => (
          <div
            key={title}
            tabIndex={0}
            className="w-full pointer-events-auto focus:pointer-events-none group"
          >
            <div className="border-b border-black w-full space-x-3 flex items-center">
              <div className="py-1 flex-1 text-left">{title}</div>
              <div
                className={
                  'transform transition-transform rotate-0 group-focus:-rotate-180 duration-300 ease-in-out text-[24px]'
                }
              >
                <Down />
              </div>
            </div>
            <div className="h-0 pointer-events-auto group-focus:h-auto group-focus:block whitespace-pre-line overflow-hidden transition-all -mt-4 group-focus:mt-0">
              {children}
            </div>
          </div>
        ))}
      </div>
    )
  }
)

export default Accordion
