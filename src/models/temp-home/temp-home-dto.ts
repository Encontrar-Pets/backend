import { Adress } from "../shelters/shelters-dto";

export class SecurityData{    
    ip?: string;
    os?: string;
    nat?: string;
}
export class TempHomeDTO{    
    name!: string;
    phone!: string;
    address?: Adress;
    security_data?: SecurityData;
}
