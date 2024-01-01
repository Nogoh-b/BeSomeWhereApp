import { Point } from "./Point"

/**
 * Point qui determine une adresse précise
 */
 export class Drive_Base {


    id: String
    price: number
    total_places: number
    places: number
    to_station: boolean
    date: string
    pointA: Point
    id_car: string
    pointB: Point
    created_at: Date
    updated_at: Date
  }


