
/**
 * Point qui determine une adresse précise
 */
 export class Item_Checklist_Categorie
  {
      created_at: string
      updated_at: string
      id: number

      name: string
      name_en: string
      src: String
  }
  enum PointType {
    Station,
    Around,
    User
}
