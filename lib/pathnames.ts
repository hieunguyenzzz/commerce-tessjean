const pathnames = {
  login: '/account/login',
  register: '/account/register',
  cart: '/cart',
  collections: {
    slug: '/pages/[slug]',
  },
  newArrivals: '/collections/new-arrivals',
  productPage: '/collections/[collection]/products/[slug]',
  shopmenu: {
    shopAll: '/collections/shop-all',
    dressed: '/collections/dresses ',
    tops: '/collections/tops',
    bottoms: '/collections/bottoms',
    motherhoodEdit: '/collections/motherhood-edit',
  },
  // CUSTOMER CARE PAGES
  shipping: '/pages/shipping',
  returns: '/pages/returns',
  ordering: '/pages/ordering',
  sizeGuide: '/pages/size-guide',
  values: '/pages/values',
  faqs: '/pages/faqs',
  contactUs: '/pages/contact-us',
  // OUR BRAND PAGES
  about: '/pages/about',
  privacyPolicy: '/pages/privacy-policy',
  termsAndConditions: '/pages/terms-and-conditions',
  // JOURNAL
  journal: '/blogs/journal',
  // CATEGORIES',
  journalTaged: '/blogs/journal/tagged/[slug]',
  // POST EXAMPLE',
  journalArticle: '/blogs/journal/[slug]',
}

export default pathnames
