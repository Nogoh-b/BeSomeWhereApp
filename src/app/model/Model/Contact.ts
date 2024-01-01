
/**
 * Point qui determine une adresse précise
 */
 export class Contact
  {
      created_at: string
      updated_at: string
      id: number
      user_id: string
      country: string
      city: string
      type_contact: string
      price: number
      language: string
      time: number
      plan: string
      begin_date: string
  }
  enum PointType {
    Station,
    Around,
    User
}
