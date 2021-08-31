import { Article, Product } from '@commerce/types'
import {
  Article as ShopifyArticle,
  Checkout,
  CheckoutLineItemEdge,
  ImageConnection,
  MoneyV2,
  Product as ShopifyProduct,
  ProductOption,
  ProductVariantConnection,
  SelectedOption
} from '../schema'
import type { Cart, LineItem } from '../types'

const money = ({ amount, currencyCode }: MoneyV2) => {
  return {
    value: +amount,
    currencyCode,
  }
}
// TODO (bc) : Remove or standarize this. 6|8|10|12|14|16
const sizeLabelMap = {
  '0': '6',
  '1': '6',
  '2': '6',
  '3': '6',
  '4': '6',
  '6': '6',
  '8': '6',
  '10': '6',
  '12': '8',
  '29': '8',
  '30': '8',
  '31': '8',
  '32': '8',
  '33': '8',
  '34': '8',
  '35': '8',
  '36': '10',
  '37': '10',
  '38': '10',
  '39': '10',
  '40': '10',
  '40.5': '12',
  '41': '12',
  '41.5': '12',
  '42': '12',
  '42.5': '12',
  '43': '12',
  '44': '12',
  '45': '12',
  '46': '14',
  '48': '14',
  '50': '16',
  '52': '16',
  '54': '16',
  'French 36': '6',
  'French 38': '8',
  'French 40': '10',
  'French 42': '10',
  'German 34': '12',
  'German 36': '12',
  'German 38': '14',
  'German 40': '14',
  'German 42': '16',
  'German 44': '16',
  'Italian 38': '6',
  'Italian 40': '8',
  'Italian 42': '10',
  'Italian 44': '12',
  'Italian 46': '12',
  'Italian 48': '14',
  'Italian 50': '14',
  'Italian 52': '16',
  'Italian 54': '16',
  Large: '14',
  Medium: '12',
  'One Size': '16',
  Small: '10',
  'UK 6': '6',
  'UK 8': '8',
  'UK 10': '10',
  'UK 12': '12',
  'UK 14': '14',
  'X Large': '14',
  'X-Large': '14',
  'X-Small': '6',
  XLarge: '14',
  'XX Large': '16',
  'XX-Large': '16',
  XXLarge: '16',
}

const fixSizeLabel = (sizeStr: string) => {
  return (sizeLabelMap as any)[sizeStr] || '10'
}
const normalizeProductOption = ({
  id,
  name: displayName,
  values,
}: ProductOption) => {
  let optionname = displayName.toLowerCase()
  return {
    __typename: 'MultipleChoiceOption',
    id,
    displayName: optionname,
    values: values.map((value) => {
      let valueStr = (''+value).toLowerCase()
      let output: any = {
        label: valueStr,
      }
      if (displayName.match(/colou?r/gi)) {
        output = {
          ...output,
          hexColors: [valueStr],
        }
      }
      if (optionname === 'size') {
        const values = fixSizeLabel(value)
        output = {
          ...output,
          label: values,
          values: valueStr,
        }
      }
      return output
    }),
  }
}

const normalizeProductImages = ({ edges }: ImageConnection) =>
  edges?.map(({ node: { originalSrc: url, ...rest } }) => ({
    url,
    ...rest,
  }))

const normalizeProductVariants = ({ edges }: ProductVariantConnection) => {
  return edges?.map(
    ({
      node: { id, selectedOptions, sku, title, priceV2, compareAtPriceV2 },
    }) => {
      return {
        id,
        name: title,
        sku: sku ?? id,
        price: +priceV2.amount,
        listPrice: +compareAtPriceV2?.amount,
        requiresShipping: true,
        options: selectedOptions.map(({ name, value }: SelectedOption) => {
          const options = normalizeProductOption({
            id,
            name,
            values: [value],
          })
          return options
        }),
      }
    }
  )
}

export function normalizeProduct(productNode: ShopifyProduct): Product {
  const {
    id,
    title: name,
    vendor,
    images,
    variants,
    description,
    handle,
    priceRange,
    options,
    ...rest
  } = productNode

  const product = {
    id,
    name,
    vendor,
    description,
    path: `/${handle}`,
    slug: handle?.replace(/^\/+|\/+$/g, ''),
    price: money(priceRange?.minVariantPrice),
    images: normalizeProductImages(images),
    variants: variants ? normalizeProductVariants(variants) : [],
    options: options
      ? options
          .filter((o) => o.name !== 'Title') // By default Shopify adds a 'Title' name when there's only one option. We don't need it. https://community.shopify.com/c/Shopify-APIs-SDKs/Adding-new-product-variant-is-automatically-adding-quot-Default/td-p/358095
          .map(normalizeProductOption)
      : [],
    ...rest,
  }

  return product
}

export function normalizeCart(checkout: Checkout): Cart {
  return {
    id: checkout.id,
    customerId: '',
    email: '',
    createdAt: checkout.createdAt,
    currency: {
      code: checkout.totalPriceV2?.currencyCode,
    },
    taxesIncluded: checkout.taxesIncluded,
    lineItems: checkout.lineItems?.edges.map(normalizeLineItem),
    lineItemsSubtotalPrice: +checkout.subtotalPriceV2?.amount,
    subtotalPrice: +checkout.subtotalPriceV2?.amount,
    totalPrice: checkout.totalPriceV2?.amount,
    discounts: [],
  }
}

function normalizeLineItem({
  node: { id, title, variant, quantity, ...rest },
}: CheckoutLineItemEdge): LineItem {
  return {
    id,
    variantId: String(variant?.id),
    productId: String(variant?.id),
    name: `${title}`,
    quantity,
    variant: {
      id: String(variant?.id),
      sku: variant?.sku ?? '',
      name: variant?.title!,
      image: {
        url: variant?.image?.originalSrc ?? '/product-img-placeholder.svg',
      },
      requiresShipping: variant?.requiresShipping ?? false,
      price: variant?.priceV2?.amount,
      listPrice: variant?.compareAtPriceV2?.amount,
    },
    path: String(variant?.product?.handle),
    discounts: [],
    options:
      // By default Shopify adds a default variant with default names, we're removing it. https://community.shopify.com/c/Shopify-APIs-SDKs/Adding-new-product-variant-is-automatically-adding-quot-Default/td-p/358095
      variant?.title == 'Default Title'
        ? []
        : [
            {
              value: variant?.title,
            },
          ],
  }
}
export function normalizeBlog(node: ShopifyArticle): Article {
  const {
    id,
    title: name,
    content,
    contentHtml,
    image,
    handle,
    publishedAt,
    seo,
    tags,
  } = node
  let article = {
    id: id || handle,
    name,
    description: content,
    path: `/${handle}`,
    publishedAt,
    slug: handle?.replace(/^\/+|\/+$/g, ''),
    content: content || null,
    contentHtml: contentHtml || null,
    tags,
  } as Article
  if (image) {
    const { originalSrc, altText, ...rest } = image
    article.image = {
      url: image.originalSrc,
      altText: image.altText || name,
      ...rest,
    }
  }
  if (seo) {
    const { title, description, ...rest } = seo
    article.seo = {
      title: title || name,
      description: description || content,
    }
  }
  return article
}
