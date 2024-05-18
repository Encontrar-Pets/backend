import { PrismaClient } from "@prisma/client";
import { SheltersDTO } from "./shelters-dto";

export class ShelterRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async create(shelter: SheltersDTO) {
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

    async findAll() {
        return await this.prisma.shelters.findMany();
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