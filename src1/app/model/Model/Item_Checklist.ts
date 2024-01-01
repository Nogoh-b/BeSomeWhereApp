
/**
 *
 */
 export class Item_Checklist {

  id: number
  name: string
  src: string
  quantity: number
  price: number
  category: ItemCategory
  item_id: number
  reservation_id: number
  created_at: string
  updated_at: string
}
 export class ItemChecklist {
  id: number;
  total: number;
  src: string;
  qty: number;
  file_id: number;
  created_at: string;
  updated_at: string
}
//  export class ItemChecklist {

//   id: number
//   name: string
//   quantity: number
//   price: number
//   category: ItemCategory
//   item_id: number
//   reservation_id: number
//   created_at: string
//   updated_at: string
// }


export enum ItemCategory {
  Meal,
  Suitcase,
  BabySeats,
}
