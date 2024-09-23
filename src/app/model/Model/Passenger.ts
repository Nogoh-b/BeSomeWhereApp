
/**
 *
 */
 export class Passenger {
  id: string | number
  gender: Gender
  first_name: string
  last_name: string
  birthday?: string
  phone: string
  email: string
  reservation_id?: string | number
  flight_number?: string
  created_at: string
  reservations?: string
  updated_at: Date | string
  take_at_home ?: boolean = false
}

export enum Gender {
  Male = 0,
  Female = 1
}
