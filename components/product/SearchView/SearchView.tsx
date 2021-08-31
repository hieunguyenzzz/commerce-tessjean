import { Product } from '@commerce/types'
import { ProductCard } from '@components/product'
import { Grid, Skeleton } from '@components/ui'
import useSearch from '@framework/product/use-search'
import rangeMap from '@lib/range-map'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Filter from './Filter'
import SearchSidebar from './SearchSidebar'

interface Props {
  activeCategory: any
  categories: any[]
}

function SearchView({ activeCategory, categories }: Props) {
  const router = useRouter()
  const { q, sort, size: currentSize, motherhood } = router.query
  // `q` can be included but because categories and designers can't be searched
  // in the same way of products, it's better to ignore the search input if one
  // of those is selected
  const searchData = useSearch({
    search: typeof q === 'string' ? q : '',
    // TODO: Shopify - Fix this type
    categoryId: activeCategory?.entityId as any,
    // TODO: Shopify - Fix this type
    sort: typeof sort === 'string' ? sort : '',
  })
  const [toggleFilter, setToggleFilter] = useState({
    categories: true,
    size: true || !!currentSize,
    sort: true || !!sort,
    motherhood: true || !!motherhood,
  })
  const sizeFilter = (product: Product, size: any) => {
    return !!product.options.find(({ displayName, values }) => {
      return (
        displayName.toLowerCase() === 'size' &&
        values.find((item) => item.label.toLowerCase() === size.toLowerCase())
      )
    })
  }
  const data = searchData.data
  const products = currentSize
    ? data?.products.filter((item) => sizeFilter(item, currentSize))
    : data?.products
  const handleClick = (event: any, filter: string) => {
    setToggleFilter({
      ...toggleFilter,
      [filter]: !(toggleFilter as any)[filter],
    })
  }
  const filterNode = (
    <Filter
      {...{
        activeCategory,
        handleClick,
        categories,
        router,
        currentSize,
        motherhood,
        sort,
        toggleFilter,
      }}
    />
  )
  return (
    <>
      <SearchSidebar>
        <div className="space-y-6">{filterNode}</div>
      </SearchSidebar>
      <div className="w-full xl:grid grid-cols-12 gap-5 xl:gap-16 mb-20">
        <div className="hidden xl:block xl:col-span-3 space-y-6 order-1 xl:order-none xl:pr-8">
          {filterNode}
        </div>
        <div className="xl:col-span-9 order-3 xl:order-none">
          {(q || activeCategory) && (
            <div className="mb-6 transition ease-in duration-75">
              {data ? (
                <>
                  <span
                    className={cn('animated', {
                      fadeIn: data.found,
                      hidden: !data.found,
                    })}
                  >
                    Showing {products?.length || 0} results{' '}
                    {q && (
                      <>
                        for "<strong>{q}</strong>"
                      </>
                    )}
                  </span>
                  <span
                    className={cn('animated', {
                      fadeIn: !data.found,
                      hidden: data.found,
                    })}
                  >
                    {q ? (
                      <>
                        There are no products that match "<strong>{q}</strong>"
                      </>
                    ) : (
                      <>
                        There are no products that match the selected category &
                        designer
                      </>
                    )}
                  </span>
                </>
              ) : q ? (
                <>
                  Searching for: "<strong>{q}</strong>"
                </>
              ) : (
                <>Searching...</>
              )}
            </div>
          )}
          <div>
            {data ? (
              <Grid layout="normal">
                {products?.map((product: Product, i) => (
                  <ProductCard
                    variant="simple"
                    key={product.slug}
                    size="small"
                    className="animated fadeIn"
                    product={product}
                    imgProps={{
                      width: 480,
                      height: 480,
                    }}
                  />
                ))}
              </Grid>
            ) : (
              <Grid layout="normal">
                {rangeMap(12, (i) => (
                  <Skeleton
                    key={i}
                    className="w-full animated fadeIn"
                    height={325}
                  />
                ))}
              </Grid>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchView
