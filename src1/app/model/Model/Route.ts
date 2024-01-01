import { Point } from "./Point";

/**
 *
 */
 export  class Route {

  id: string;
  starting_date: string;
  arrival_date: string;
  back: boolean;
  places: number;
  total_places: number;
  status: number;
  for_disabled: boolean;
  price: number;
  points: Point[];
  point: number;
  to_station: boolean;
  updated_at: string;
  created_at: string;
}

export  enum RouteStatus {
  Available,
  Full,
  Pending,
  Finish,
}
