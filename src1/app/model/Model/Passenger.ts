
/**
 *
 */
 export class Passenger {
  id: string
  gender: Gender
  first_name: string
  last_name: string
  birthday: string
  phone: string
  email: string
  created_at: string
  reservations: string
}

export enum Gender {
  Male = 0,
  Female = 1
}
