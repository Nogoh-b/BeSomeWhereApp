
/**
 * Point qui determine une adresse précise
 */
 export class Ads
  {
      created_at: string
      updated_at: string
      id: number
      title: string
      description: String
      image: string
      link: string
  }
  enum PointType {
    Station,
    Around,
    User
}
