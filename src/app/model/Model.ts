
class Utilisateur {

    id: bigint
    username: string
    first_name: string
    last_name: string
    email: string
    birthay: Date
    phone: string
    created_at: Date
    address: Point
    checklists: [Checklist!]
    reservations: [Reservation!]
}

enum Enumeration1 {
}

class Transport {

    price: number
    starting_point: Point
    arrival_point: Point
    total_place: number
    route: Route
}

class Class1 {

}

class Route {

    id: String
    starting_date: Date
    arrival_date: Date
    places: number
    status: RouteStatus
    for_handicapped: boolean
    transports: [Transport!]
    transport: Transport
    reservation: Reservation
    routeStatus: RouteStatus
}

// Point qui determine une adresse précise
class Point {

    id: bigint
    title: string
    description: String
    image: string
    country: string
    city: string
    address: string
    code: number
    longitude: number
    lattitude: number
    class: PointType
    image: string
    type: string
    parent: Point
    point: Point!
    points: [Point!]
    PointType: PointType
}

enum class_transport {
    Car
    Bike
    Train
    Bicycle
    Boat
    Plane
    Bus
}

class Payment {

    id: bigint
    code: String
    amount: String
    crated_at: String
}

class Transport {

    id: String
    class: class_transport
    image: string
    class_transport: class_transport
    checklists: [Checklist!]
}

class Checklist {

    id: String
    name: string
    with_baby: boolean
    utilisateur: Utilisateur!
    transport: Transport!
    folders: [Folder!]

}

class Date {

    id: String
}

class journey {

    id: String
    starting_date: Date
    arrival_date: Date
    city: string
    country: string
}

class Folder {

    id: bigint
    name: string
    checklist: Checklist!
    item_checklists: [Item_checklist!]
}


class Category {

    id: bigint
    name: string
    image: string
    item_checklist: Item_checklist
    item_checklists: [Item_checklist!]
}

class Qty {

    id: bigint
    max_qty: number
    current_qty: String
}

class Reservation {

    id: bigint
    created_at: Date
    Attribute1: String
    utilisateur: Utilisateur!
    route: Route
    items: [Item]
    passengers: [Passenger!]
}

enum RouteStatus {
    Available,
    Full,
    Pending,
    Finish
}

class Passenger {
    id: string
    gender: Gender
    first_name: string
    last_name: string
    birthday: string
    created_at: string
    reservations: string
}

enum Gender {
    Male
    Female
}

class Item {

    id: bigint
    name: string
    category: ItemCategory
    quantity: number
    price: number
    reservation: Reservation!
    itemCategory: ItemCategory
}

export enum ItemCategory {
    Meal
    Suitcase
    BabySeats
}


