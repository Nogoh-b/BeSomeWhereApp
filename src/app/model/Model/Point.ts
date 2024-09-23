
/**
 * Point qui determine une adresse précise
 */
 export class Point {

      id: number
      title: string
      description: string
      image: string
      country: string
      city: string
      address: string
      code: number | string
      longitude?: number
      lattitude?: number
      is_station?: boolean
      class?: PointType
      type: string
      parent?: Point | number
      arround?: Point[]
      PointType?: PointType
      distance?: number
      created_at: string
      updated_at: string
  }
  enum PointType {
    Station,
    Around,
    User
}
