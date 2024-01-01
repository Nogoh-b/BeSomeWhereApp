import { MealCategory } from "src/global"

/**
 *
 */
 export class Item_Proposed {

  id: number
  name: string
  category_id: number
  price: number
  category: Category
  created_at: string
  updated_at: string
}
export class Category {

  id: number
  name: string
  src: string
  created_at: string
  updated_at: string
}


export enum ItemCategory {
  Meal,
  Suitcase,
  BabySeats,
}
