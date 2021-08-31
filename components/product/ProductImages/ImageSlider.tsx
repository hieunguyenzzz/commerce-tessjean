import cn from 'classnames'
import { useKeenSlider } from 'keen-slider/react'
import React, { Children, forwardRef, useRef, useState } from 'react'
import s from './ImageSlider.module.css'

interface Props {
  children?: Element[]
}
const Slider = forwardRef<HTMLDivElement, Props>(({ children }, ref) => {
  return (
    <div ref={ref} className="keen-slider">
      {Children.map(children, (child) => {
        // Add the keen-slider__slide className to children
        return <div className={cn('keen-slider__slide')}>{child}</div>
      })}
    </div>
  )
})
const ImageSlider: React.FC = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const sliderContainerRef = useRef<HTMLDivElement>(null)
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    spacing: 10,
    slidesPerView: 1,
    centered: false,
    loop: false,
    mounted: () => setIsMounted(true),
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide)
    },
  })
  return (
    <div ref={sliderContainerRef} className={s.root} data-testid="ImageSlider">
      {slider && currentSlide !== 0 && (
        <button
          className={cn(s.leftControl, s.control)}
          onClick={slider?.prev}
          aria-label="Previous Product Image"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.0002 18L15.4102 16.59L10.8302 12L15.4102 7.41L14.0002 6L8.00016 12L14.0002 18Z"
              fill="#111111"
            />
          </svg>
        </button>
      )}
      {slider && currentSlide < slider.details().size - 1 && (
        <button
          className={cn(s.rightControl, s.control)}
          onClick={slider?.next}
          aria-label="Next Product Image"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.99984 6L8.58984 7.41L13.1698 12L8.58984 16.59L9.99984 18L15.9998 12L9.99984 6Z"
              fill="#111111"
            />
          </svg>
        </button>
      )}
      <Slider ref={sliderRef}>{children as any}</Slider>
      {slider && (
        <div className={cn(s.positionIndicatorsContainer)}>
          {[...Array(slider.details().size).keys()].map((idx) => {
            return (
              <button
                aria-label="Position indicator"
                key={idx}
                className={cn(s.positionIndicator, {
                  [s.positionIndicatorActive]: currentSlide === idx,
                })}
                onClick={() => {
                  slider.moveToSlideRelative(idx)
                }}
              >
                <div className={s.dot} />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
export default ImageSlider
