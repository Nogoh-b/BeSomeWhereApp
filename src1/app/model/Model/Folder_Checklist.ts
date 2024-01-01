
/**
 *
 */
 export class File_Checklist {
  id: number;
  name: string;
  parent: number;
  isFolder: boolean;
  isDefault: boolean;
  checklist_id: number;
  total?: number;
  qty?: number;
  stats?: FolderStats
  created_at: string;
  updated_at: string;
}
 export class FolderStats {
  total_files: number;
  folders: any;
  files: any;
  total_folders: number;
  total_qty: number;
  qty: number;
}
class Simple{
  id: number;

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
  BabySeats
}
