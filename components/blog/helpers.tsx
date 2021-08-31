import { Article } from '@commerce/types'

export function getLink(handle: string) {
  return `/blog/journal/${handle}`
}
export function getAllTagsFromArticles(articles: Article[]) {
  return articles
    .flatMap((article) => article.tags || [])
    .reduce((result: string[], tag) => {
      if (result.find((item) => item === tag)) {
        return result
      }
      result.push(tag)
      return result
    }, [])
}
