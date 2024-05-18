import { PrismaClient } from "@prisma/client";
import { SheltersDTO } from "./shelters-dto";

const defaultSelect = {
    id: true,
    name: true,
    phone: true,
    address: true,
    login: false,
    password: false,
};

export class SheltersRepository {
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
        return await this.prisma.shelters.findMany({
            select: { ...defaultSelect }
        });
    }

    async findById(id: string) {
        return await this.prisma.shelters.findUnique({
            select: { ...defaultSelect },
            where: {
                id
            }
        });
    }

    async login(login: string, password: string) {
        return await this.prisma.shelters.findFirstOrThrow({
            select: { ...defaultSelect },
            where: {
                login: login,
                password: password
            }
        });
    }
}