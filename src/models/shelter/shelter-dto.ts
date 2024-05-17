export class Adress{    
    street!: string;
    number!: string;
    neighborhood?: string;
    city!: string;
    state!: string;
    zip_code!: string;
}

export class ShelterDTO{
    name!: string;
    phone!: string;
    address!: Adress;
    login!: string;
    password!: string;
}