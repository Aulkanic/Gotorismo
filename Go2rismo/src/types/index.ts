export interface T_Admin{
    email:string;
    password:string;
}

export interface T_Business{
    address: string;
    birthDate: string;
    businessName: string;
    businessPermit: string;
    businessType: string;
    email: string;
    firstName: string;
    lastName: string;
    location: string;
    password: string;
    phoneNumber: string;
    validID: string;  
}

export interface T_Traveller{
    address: string;
    birthDate: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    phoneNumber: string;
    validID: string;
}