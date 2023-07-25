import React from "react";
import CustomersTable from '../../../components/Tables/CustomersTable'
import {customerProfileComplete} from '@/types/types';
export default function CustomersPage(){
    return <CustomersTable {...customerProfileComplete}/>
};
