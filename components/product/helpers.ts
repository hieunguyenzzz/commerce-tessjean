import type { Product } from '@commerce/types'
export type SelectedOptions = Record<string, string | null>
const sizeRange = ['6', '8', '10', '12', '14', '16']
export function getSizeRange(product: Product) {
  const productsizes = product.options.flatMap((option) => {
    if (option.displayName === 'size') {
      return option.values
    }
    return []
  })
  return sizeRange.map((size) => ({
    label: size,
    values: size,
    available: productsizes.find((option) => option.label === size),
  }))
}
export function getVariant(product: Product, opts: SelectedOptions) {
  const variant = product.variants.find((variant) => {
    return Object.entries(opts).every(([key, value]) =>
      variant.options.find((option) => {
        if (
          option.__typename === 'MultipleChoiceOption' &&
          option.displayName === key
        ) {
          return option.values.find((v) => v.label === value)
        }
      })
    )
  })
  return variant
}

// TODO (bc) : Remove or standarize this.
export const SORT = Object.entries({
  featured: 'featured',
  'newest-in': 'newest in',
  'price-asc': 'Price Low to high',
  'price-desc': 'Price High to low',
})
// TODO (bc) : Remove or standarize this.
export const MOTHERHOOD = Object.entries({
  pregnant: 'pregnant',
  nursing: 'nursing',
})
// TODO (bc) : Remove or standarize this.
export const NUMBER_SIZE = ['6', '8', '10', '12', '14', '16']
export const TEXT_SIZE = ['xs', 's', 'm', 'l']

export const CATEGORIES = [
  {
    label: 'DRESSES',
    getHref: () => {
      return `/search?q=DRESSES`
    },
  },
  {
    label: 'TOPS',
    getHref: () => {
      return `/search?q=TOPS`
    },
  },
  {
    label: 'BOTTOMS',
    getHref: () => {
      return `/search?q=BOTTOMS`
    },
  },
  {
    label: 'VIEW ALL',
    getHref: () => {
      return `/search`
    },
  },
  {
    label: 'SALE',
    getHref: () => {
      return `/search?q=SALE`
    },
  },
]
export const placeholderImg = '/product-img-placeholder.svg'
export const getProductLink=(handle: string)=> {
  return `/product/${handle}`
}
