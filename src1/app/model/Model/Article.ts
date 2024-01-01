import { Point } from './Point';

/**
 * Point qui determine une adresse précise
 */
 export class Article {

      id: number
      title: any
      content: any
      status: string
      type: string
      author: string
      featured_media: string
      categories: Array<number>
      tags: Array<number>
      date: string
      modified_gmt: string
      date_gmt: string
      excerpt: any
      _embedded: any
      modified: string
      _links: any
  }

export enum ArticleStatus{
  publish,
  future,
  draft,
  pending,
  private
}
