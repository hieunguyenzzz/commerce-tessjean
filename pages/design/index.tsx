import { Text } from '@components/ui'
const styles: {
  [key: string]: string
} = {
  'h1 HEADLINE': `font-size: 36px;
text-transform: uppercase;
line-height: 43px;
letter-spacing: 0.06em;`,
  'h2 HEADLINE': `font-size: 32px;
text-transform: uppercase;
line-height: 38px;
letter-spacing: 0.06em;`,
  'h3 HEADLINE': `font-size: 24px;
text-transform: uppercase;
line-height: 29px;
letter-spacing: 0.06em;
font-weight: bold;`,
  'h4 HEADLINE': `font-size: 24px;
text-transform: uppercase;
line-height: 29px;
letter-spacing: 0.06em;`,
  'h5 HEADLINE': `font-size: 18px;
text-transform: uppercase;
line-height: 22px;
letter-spacing: 0.06em;
font-weight: bold;`,
  'h6 HEADLINE': `font-size: 14px;
line-height: 17px;
letter-spacing: 0.06em;
font-weight: bold;`,
  'h7 HEADLINE': `font-size: 14px;
line-height: 17px;
letter-spacing: 0.08em;`,
  subtitle: `font-family: Montserrat;
font-size: 14px;
line-height: 17px;
letter-spacing: 0.06em;
color: #5E5E5E;`,
  'body 1': `font-size: 16px;
line-height: 19px;
letter-spacing: 0.06em;`,
  button: `font-family: Montserrat;
font-size: 14px;
text-transform: uppercase;
font-weight: 500;
line-height: 17px;
letter-spacing: 0.15em;`,
}
export default function Typography() {
  return (
    <div className="m-auto flex flex-col items-start w-full max-w-3xl min-h-screen py-12 space-y-12">
      {[
        'h1 HEADLINE',
        'h2 HEADLINE',
        'h3 HEADLINE',
        'h4 HEADLINE',
        'h5 HEADLINE',
        'h6 HEADLINE',
        'h7 HEADLINE',
        'subtitle',
        'body 1',
        'button',
      ].map((str, i) => {
        const variant = str.split(' ')[0]
        return (
          <div key={i} className="flex md:space-x-4 w-full">
            <div className="flex-1 text-right">
              <Text variant={variant as any}>{str}</Text>
            </div>
            <div
              className="flex-1 whitespace-pre"
              dangerouslySetInnerHTML={{ __html: styles[str] || '' }}
            ></div>
          </div>
        )
      })}
    </div>
  )
}
