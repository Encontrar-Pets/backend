import { PrismaClient } from "@prisma/client";
import { PetTagsDto } from "./pet-tags-dto";

export class PetTagsRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async create(tag: PetTagsDto) {
        return await this.prisma.pet_tags.create({
            data: {
                description: tag.description,
            }
        });
    }
}