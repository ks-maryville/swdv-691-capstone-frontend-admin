import React from "react";
import CustomersTable from '../../../components/Tables/CustomersTable'
import {customerProfileComplete} from '@/seed';
import OrdersTable from "@/components/Tables/OrdersTable";
import {OrderDataArray} from "@/types/orderTypes";

export default function CustomersPage() {


    return <>
        <CustomersTable {...customerProfileComplete}/>
        <OrdersTable {...customerProfileComplete}/>

    </>
};
