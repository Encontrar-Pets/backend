import { PrismaClient } from "@prisma/client";
import { TagsDto } from "./tags-dto";

export class TagsRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async create(tag: TagsDto) {
        return await this.prisma.tags.create({
            data: {
                description: tag.description,
            }
        });
    }
}