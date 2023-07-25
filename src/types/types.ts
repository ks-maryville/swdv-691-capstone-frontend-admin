import {Runtime} from "inspector";
import {Address} from "cluster";


export interface IAuth {
    email: string;
    password: string;
}

export interface IRegister extends IAuth {
    verify: string;
}

export type UserData = {
    user_id: number;
    email: string;
    role_id: number;
}
export type AddressData = {
    address_1: string;
    address_2: string | null;
    city: string;
    state: string;
    zip_code: string;
    primary: boolean;
}

export type OrderData = {
    order_id: number;
    invoice_number: string;
    status: "pending" | "arrived" | "delivered";
    location: string;
    date_created: Date;
}

export type AppointmentData = {
    appointment_id: number;
    date_and_time: Date;
    status: "pending" | "delivered";
    notes: string;
    order_id: number;
}

export interface customerProfileKeySig {
    [key: string]: any;
}

export interface CustomerProfileData extends customerProfileKeySig {
    profile_id: number;
    first_name: string;
    middle_initial: string | null
    last_name: string;
    primary_address: string;
    email: string;
    addresses: AddressData[] | [];
    orders: OrderData[] | [];
    appointments: AppointmentData[] | [];

}

export interface CustomerProfileArray {
    data: CustomerProfileData[];
}

export const customerprofile: CustomerProfileData = {
    profile_id: 4,
    first_name: "kevin",
    middle_initial: null,
    last_name: "sherrell",
    primary_address: "primary address",
    email: "email",
    addresses: [],
    orders: [],
    appointments: []
}

export const customerProfileComplete: CustomerProfileArray = {
    data: [{
        profile_id: 4,
        first_name: "kevin",
        middle_initial: null,
        last_name: "sherrell",
        primary_address: "primary address",
        email: "email",
        addresses: [],
        orders: [],
        appointments: []
    },
        {
            profile_id: 4,
            first_name: "kevin",
            middle_initial: null,
            last_name: "sherrell",
            primary_address: "primary address",
            email: "email",
            addresses: [],
            orders: [],
            appointments: []
        },
        {
            profile_id: 4,
            first_name: "kevin",
            middle_initial: null,
            last_name: "sherrell",
            primary_address: "primary address",
            email: "email",
            addresses: [],
            orders: [],
            appointments: []
        }
    ]
}
