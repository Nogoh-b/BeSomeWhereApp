import { Point } from './Point';

/**
 * Point qui determine une adresse précise
 */
 export class ArticleCategory {

      id: number
      name: string
      parent: string
      description: string
      count: number
      slug: string
      date: string
      date_gmt: string
      modified_gmt: string
      modified: string
  }

export enum ArticleStatus{
  publish,
  future,
  draft,
  pending,
  private
}
