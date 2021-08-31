import cn from 'classnames'
import React, {
  CSSProperties,
  FunctionComponent,
  JSXElementConstructor,
} from 'react'
import s from './Text.module.css'

interface Props {
  variant?: Variant
  className?: string
  style?: CSSProperties
  children?: React.ReactNode | any
  html?: string
}

type Variant =
  | 'heading'
  | 'body'
  | 'pageHeading'
  | 'sectionHeading'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'h7'
  | 'subtitle'
  | 'button'

const Text: FunctionComponent<Props> = ({
  style,
  className = '',
  variant = 'body',
  children,
  html,
}) => {
  const componentsMap: {
    [P in Variant]: React.ComponentType<any> | string
  } = {
    body: 'div',
    heading: 'h1',
    pageHeading: 'h1',
    sectionHeading: 'h2',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h4',
    h6: 'h4',
    h7: 'h4',
    subtitle: 'div',
    button: 'button',
  }

  const Component:
    | JSXElementConstructor<any>
    | React.ReactElement<any>
    | React.ComponentType<any>
    | string = componentsMap![variant!]

  const htmlContentProps = html
    ? {
        dangerouslySetInnerHTML: { __html: html },
      }
    : {}

  return (
    <Component
      className={cn(s.root, s[variant], className)}
      style={style}
      {...htmlContentProps}
    >
      {children}
    </Component>
  )
}

export default Text
