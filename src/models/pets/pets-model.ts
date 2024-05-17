import { PrismaClient } from "@prisma/client";
import { PetStatus, PetsDTO } from "./pets-dto";

export class PetsRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async create(pet: PetsDTO) {
        return await this.prisma.pets.create({
            data: {
                name: pet.name,
                description: pet.description,
                status: PetStatus.AVAILABLE,
                type: pet.type,
                img_url: pet.img_url,
                shelter_id: pet.shelter_id,
                pet_tags: {
                    connect: pet.pet_tag_ids ? pet.pet_tag_ids.map((id) => ({ id })) : [],
                }
            }
        });
    }

    async findAllAvailable() {
        return await this.prisma.pets.findMany({
            where: {
                status: PetStatus.AVAILABLE
            }
        });
    }

    async findById(id: string) {
        return await this.prisma.pets.findUnique({
            where: {
                id
            }
        });
    }

    async changeStatus(id: string, status: PetStatus) {
        return await this.prisma.pets.update({
            where: {
                id
            },
            data: {
                status: status,
                updated_at: new Date()
            }
        })
    }

    async addAplicant(id: string, aplayer_id: string) {
        return await this.prisma.pets.update({
            where: {
                id
            },
            data: {
                status: PetStatus.PENDING,
                applicant_owner_id: aplayer_id,
                updated_at: new Date()
            }
        })
    }
}