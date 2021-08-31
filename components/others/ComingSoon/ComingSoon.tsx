import { LoadingDots } from '@components/ui'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'
interface Props {
  title?: string
  content?: string
}
const ComingSoon: FC<Props> = ({}) => {
  const [status, setstatus] = useState<'idle' | 'loading' | 'success'>('idle')
  return (
    <div className="bg-primary absolute w-full min-h-full text-white text-center  flex items-center">
      <style>
        {`html{
                background:var(--primary)
          }
        `}
      </style>
      <div
        style={{
          fontSize: '12px',
          letterSpacing: '2px',
          fontFamily: `Helvetica, 'Helvetica Neue', Arial, 'Lucida Grande', sans-serif`,
        }}
        className="flex max-w-5xl w-full m-auto flex-col lg:flex-row  lg:space-y-6 space-y-12"
      >
        <div className="relative">
          <Image
            layout="intrinsic"
            width={450}
            height={450}
            src="/coming-soon.jpg"
          />
        </div>
        <div className="flex-1">
          <div className="text-center leading-normal w-full mx-auto max-w-lg py-12  space-y-16">
            <div className="uppercase px-12 lg:px-6">
              TESS JEAN IS A CONTEMPORARY FASHION LABEL THAT EMBODIES EFFORTLESS
              STYLE FOR THE MODERN WOMAN.
              <br />
              <br />
              Versatile, timeless pieces to wear from day to night and
              everything in between.
              <br />
              <br />
              Consciously designed and made in Vietnam in limited editions.
              <br />
              <br />
              Sign up to follow our journey and be the first to hear when we
              launch.
            </div>
            <div className="flex-1 flex flex-col space-y-6 px-6">
              {status !== 'success' && (
                <>
                  <div className="w-full text-center uppercase text-black font-bold">
                    join us
                  </div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      setstatus('loading')
                      setTimeout(() => {
                        setstatus('success')
                      }, 2000)
                    }}
                    className="w-full flex space-x-2 p-1 bg-white border border-transparent focus-within:border-accents-6 transition-all"
                  >
                    <input
                      name="subscriber"
                      required
                      className="flex-1 text-base text-black bg-transparent px-3 appearance-none focus:outline-none block border-none p-0 "
                      type="email"
                      placeholder="Your email address"
                    ></input>
                    <button
                      type="submit"
                      className="inline-flex font-bold justify-center uppercase px-8 h-8 items-center py-2 bg-primary relative truncate"
                    >
                      {status === 'idle' && <span>sign up</span>}
                      {status === 'loading' && (
                        <span className="invisible">sign up</span>
                      )}
                      {status === 'loading' && (
                        <div className="absolute inset-0 flex justify-center items-center">
                          <LoadingDots />
                        </div>
                      )}
                    </button>
                  </form>
                </>
              )}
              {status === 'success' && (
                <div className="text-black text-center w-full">
                  Thank for subscribe!
                </div>
              )}
              <div className="flex space-x-6 p-6 w-full justify-center">
                <a
                  href="https://www.facebook.com/tessjeanwoman"
                  target="_blank"
                  className="text-2xl hover-effect-1 rounded-lg"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 448 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"></path>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/_TESSJEAN_/"
                  target="_blank"
                  className="text-2xl hover-effect-1 rounded-lg"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 448 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                  </svg>
                </a>
              </div>
              <div className="flex justify-center">
                <Link href="/blog/journal">
                  <a className="text-effect-1 py-2">JOURNAL</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-32" />
    </div>
  )
}

export default ComingSoon
