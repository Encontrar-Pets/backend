import { Adress } from "../shelter/shelter-dto";

export class SecurityData{    
    ip?: string;
    os?: string;
    nat?: string;
}
export class TempHome{    
    name!: string;
    phone!: string;
    address?: Adress;
    security_data?: SecurityData;
}
