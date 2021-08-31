import { Text } from '@components/ui'

export default function Typography() {
  return (
    <div className="m-auto flex flex-col items-start space-y-6 w-96 min-h-screen py-12">
      {[
        'h1 headline',
        'h2 headline',
        'h3 headline',
        'h4 headline',
        'h5 headline',
        'h6 headline',
        'h7 headline',
        'subtitle',
        'body',
        'button',
      ].map((str) => {
        const variant = str.split(' ')[0]
        return <Text variant={variant as any}>{str}</Text>
      })}
    </div>
  )
}
