import {OrderData, OrderDataArray} from "@/types/orderTypes";
import {AppointmentData} from "@/types/appointmentTypes";
export interface CustomerProfileData {
    [key: string]: any;
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


export type AddressData = {
    address_1: string;
    address_2: string | null;
    city: string;
    state: string;
    zip_code: string;
    primary: boolean;
}



