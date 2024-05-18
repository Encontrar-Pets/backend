import { PrismaClient } from "@prisma/client";
import { ShelterDTO } from "./shelter-dto";

export class ShelterRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async create(shelter: ShelterDTO) {
        return await this.prisma.shelters.create({
            data: {
                name: shelter.name,
                phone: shelter.phone,
                address: { ...shelter.address },
                login: shelter.login,
                password: shelter.password,
            }
        });
    }

    async findById(id: string) {
        return await this.prisma.shelters.findUnique({
            select: {
                password: false,
            },
            where: {
                id
            }
        });
    }

    async login(login: string, password: string) {
        return await this.prisma.shelters.findFirstOrThrow({
            select: {
                password: false,
            },
            where: {
                login: login,
                password: password
            }
        });
    }
}