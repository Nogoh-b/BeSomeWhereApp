import { Gender } from './Passenger';
import { Point } from "./Point";

/**
 *
 */
export class User {

    /**
     *
     */
    public constructor() {
    }

    /**
     *
     */
    id: string | number;
    /**
     *
     */
    username?: string;
    /**
     *
     */
     email_verified_at: string
    first_name: string;
    /**
     *
     */
    last_name: string;
    /**
     *
     */
    email: string;
    /**
     *
     */
    birthday: string;
    birthay?: string;
    /**
     *
     */
    phone: string;
    lattitude: any;
    cur_country: string;
    longitude: any;
    name: string;
    token: string;
    image: string;
    country: string;
    city: string;
    address: string;
    gender: Gender
    joined: boolean
    /**
     *
     */
    created_at: string;
    updated_at: string;
    /**
     *
     */
    // address: Point;
}

