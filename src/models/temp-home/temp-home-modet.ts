import { PrismaClient } from "@prisma/client";
import { TempHomeDTO } from "./temp-home-dto";

export class TempHomeRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async create(tempHome: TempHomeDTO) {
        return await this.prisma.temp_home.create({
            data: {
                name: tempHome.name,
                phone: tempHome.phone,
                address: { ...tempHome.address },
                security_data: { ...tempHome.security_data },
            }
        });
    }

    async findByPhone(phone: string) {
        return await this.prisma.temp_home.findMany({
            where: {
                phone: phone
            }
        });
    }

    async findById(id: string) {
        return await this.prisma.temp_home.findUnique({
            where: {
                id
            }
        });
    }

    async findByName(name: string) {
        return await this.prisma.temp_home.findMany({
            where: {
                name: name
            }
        });
    }
}