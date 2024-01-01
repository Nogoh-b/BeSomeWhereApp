import { MealCategory } from "src/global"

/**
 *
 */
 export class Item_Drive {

  id: number
  name: string
  quantity: number
  quantity_max: number
  price: number
  category: ItemCategory
  sub_category: MealCategory
  description?: string
  item_id: number
  reservation_id: number
  src: string
  created_at: string
  updated_at: string
}
 export class ItemChecklist {

  id: number
  name: string
  quantity: number
  price: number
  category: ItemCategory
  item_id: number
  reservation_id: number
  created_at: string
  updated_at: string
}


export enum ItemCategory {
  Meal,
  Suitcase,
  BabySeats,
}
