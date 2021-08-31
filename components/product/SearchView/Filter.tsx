import { Down } from '@components/icons'
import { filterQuery, getCategoryPath } from '@lib/search'
import cn from 'classnames'
import Link from 'next/link'
import { ReactElement, ReactEventHandler } from 'react'
import { MOTHERHOOD, NUMBER_SIZE, SORT, TEXT_SIZE } from '../helpers'

function Select({
  onToggle,
  open,
  title,
  children,
}: {
  open: boolean
  title: string | ReactElement
  placeholder: string | ReactElement
  children: string | ReactElement
  onToggle: ReactEventHandler
}) {
  return (
    <div className="relative inline-block w-full">
      <div className="block">
        <div
          onClick={onToggle}
          className={cn(
            'flex space-x-3 justify-between py-2 px-0 text-base no-underline font-bold tracking-wide  focus:outline-none focus:bg-gray-100 focus:text-gray-900'
          )}
        >
          <a className={'block xl:inline-block header-2 uppercase'}>{title}</a>
          <button
            className={cn(
              'transform transition-transform  duration-300 ease-in-out',
              open ? '-rotate-180' : 'rotate-0'
            )}
          >
            <Down />
          </button>
        </div>
      </div>
      <div
        className={`relative left-0 w-full rounded-md  z-10 ${
          !open ? 'hidden' : ''
        }`}
      >
        <div className="rounded-sm">
          <div
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
export const Filter = ({
  activeCategory,
  handleClick,
  categories,
  router,
  currentSize,
  motherhood,
  sort,
  toggleFilter,
}: {
  activeCategory?: any
  handleClick: any
  categories: any[]
  router: any
  currentSize: any
  motherhood: any
  sort: any
  toggleFilter: any
}) => {
  return (
    <>
      <Select
        {...{
          placeholder: activeCategory?.name
            ? `Category: ${activeCategory?.name}`
            : 'All Categories',
          title: 'Categories',
          open: toggleFilter['categories'],
          onToggle: (e) => handleClick(e, 'categories'),
        }}
      >
        <ul>
          {categories.map((cat) => (
            <li
              key={cat.path}
              className={cn(
                'block py-2 px-0 tracking-widest text-h7 uppercase hover:underline focus:outline-none focus:bg-gray-100 focus:text-gray-900',
                {
                  'text-primary': activeCategory?.entityId === cat.entityId,
                }
              )}
            >
              <Link
                href={{
                  pathname: getCategoryPath(cat.path),
                  query: router.query,
                }}
              >
                <a className={'inline-block'}>{cat.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </Select>
      <Select
        {...{
          placeholder: currentSize ? `Size: ${currentSize}` : 'All sizes',
          title: 'Size',
          open: toggleFilter['size'],
          onToggle: (e) => handleClick(e, 'size'),
        }}
      >
        <ul
          style={{
            gridTemplateRows: `repeat(${Math.max(
              NUMBER_SIZE.length,
              TEXT_SIZE.length
            )}, minmax(0, 1fr))`,
          }}
          className="grid grid-cols-2 grid-flow-col grid-rows-6"
        >
          {NUMBER_SIZE.map((size) => (
            <li
              key={size}
              className={cn(
                'block py-2 px-0  text-h7 uppercase hover:underline  focus:outline-none focus:bg-gray-100 focus:text-gray-900',
                {
                  // @ts-ignore Shopify - Fix this types
                  'text-primary': currentSize === size,
                }
              )}
            >
              <Link
                href={{
                  pathname: router.pathname,
                  query: filterQuery({
                    ...router.query,
                    size,
                  }),
                }}
              >
                <a className={'inline-block'}>{size}</a>
              </Link>
            </li>
          ))}
          {TEXT_SIZE.map((size) => (
            <li
              key={size}
              className={cn(
                'block py-2 px-0  text-h7 uppercase hover:underline xl: focus:outline-none focus:bg-gray-100 focus:text-gray-900',
                {
                  // @ts-ignore Shopify - Fix this types
                  'text-primary': currentSize === size,
                }
              )}
            >
              <Link
                href={{
                  pathname: router.pathname,
                  query: {
                    ...router.query,
                    size,
                  },
                }}
              >
                <a className={'inline-block'}>{size}</a>
              </Link>
            </li>
          ))}
        </ul>
      </Select>
      <Select
        {...{
          placeholder: activeCategory?.name
            ? `Motherhood: ${activeCategory?.name}`
            : 'Motherhood: all',
          title: 'Motherhood',
          open: toggleFilter['motherhood'],
          onToggle: (e) => handleClick(e, 'motherhood'),
        }}
      >
        <ul>
          <li
            className={cn(
              'block py-2 px-0 tracking-widest text-h7 uppercase hover:underline xl: focus:outline-none focus:bg-gray-100 focus:text-gray-900',
              {
                'text-primary': !motherhood,
              }
            )}
          >
            <Link
              href={{
                pathname: router.pathname,
                query: filterQuery({
                  ...router.query,
                  motherhood: undefined,
                }),
              }}
            >
              <a className={'inline-block'}>all</a>
            </Link>
          </li>
          {MOTHERHOOD.map(([key, text]) => (
            <li
              key={key}
              className={cn(
                'block py-2 px-0 tracking-widest text-h7 uppercase hover:underline xl: focus:outline-none focus:bg-gray-100 focus:text-gray-900',
                {
                  'text-primary': motherhood === key,
                }
              )}
            >
              <Link
                href={{
                  pathname: router.pathname,
                  query: {
                    ...router.query,
                    q: key,
                  },
                }}
              >
                <a className={'inline-block'}>{text}</a>
              </Link>
            </li>
          ))}
        </ul>
      </Select>
      <Select
        {...{
          placeholder: sort ? `Sort by: ${sort}` : 'Sort',
          title: 'Sort by',
          open: toggleFilter['sort'],
          onToggle: (e) => handleClick(e, 'sort'),
        }}
      >
        <ul>
          {SORT.map(([key, text]) => (
            <li
              key={key}
              className={cn(
                'block py-2 px-0  text-h7 uppercase hover:underline xl: focus:outline-none focus:bg-gray-100 focus:text-gray-900',
                {
                  'text-primary': sort === key,
                }
              )}
            >
              <Link
                href={{
                  pathname: router.pathname,
                  query: filterQuery({
                    ...router.query,
                    sort: key,
                  }),
                }}
              >
                <a className={'inline-block'}>{text}</a>
              </Link>
            </li>
          ))}
        </ul>
      </Select>
    </>
  )
}
export default Filter
