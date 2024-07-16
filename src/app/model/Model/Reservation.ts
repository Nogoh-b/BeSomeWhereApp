import { ItemChecklist } from "./Item_Checklist"
import { Item_Drive } from "./Item_Drive"
import { Passenger } from "./Passenger"
import { Point } from "./Point"
import { Route } from "./Route"
import { User } from "./Utilisateur"

/**
 *
 */
 export class Reservation {
  id: number
  created_at: string
  updated_at: string
  starting_date: string
  take_to_home_adr: string
  id_car: string
  arrival_date: string
  status: number;//ReservationStatus
  customer: User
  for_disabled: boolean
  route: Route
  items: Item_Drive[]
  price: number
  take_at_home: boolean
  passengers: Passenger[]
  points: Point[]
  total?: string
}

export enum ReservationStatus {
  Available,
  Full,
  Pending,
  Finish
}
