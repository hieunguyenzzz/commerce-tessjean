// templates/default/index.js

import { LoadingDots } from '@components/ui'
import React from 'react'
const Gallery = React.lazy(() => import('./Gallery'))
export default function GalleryView(props: any) {
  return (
    <React.Suspense fallback={LoadingDots}>
      <Gallery {...(props as any)} />
    </React.Suspense>
  )
}
