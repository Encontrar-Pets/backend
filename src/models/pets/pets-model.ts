import { PrismaClient } from '@prisma/client';
import { PetStatus, PetsDTO } from './pets-dto';

export class PetsRepository {
  constructor(private readonly prisma: PrismaClient) { }

  async create(pet: PetsDTO) {
    return await this.prisma.pets.create({
      data: {
        name: pet.name,
        description: pet.description,
        status: pet.status,
        type: pet.type,
        img_url: pet.img_url,
        shelter_id: pet.shelter_id,
        tags: {
          connect: pet.pet_tag_ids ? pet.pet_tag_ids.map((id) => ({ id })) : []
        }
      }
    });
  }

  async createLostedPet(pet: PetsDTO) {
    return await this.prisma.pets.create({
      data: {
        name: pet.name,
        description: pet.description,
        status: PetStatus.LOST,
        type: pet.type,
        img_url: pet.img_url,
        owner_id: pet.owner_id,
        tags: {
          connect: pet.pet_tag_ids ? pet.pet_tag_ids.map((id) => ({ id })) : []
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

  async findAllLosted() {
    return await this.prisma.pets.findMany({
      where: {
        status: PetStatus.LOST
      }
    });
  }

  async findAllLostedByTagIds(tags_ids: Array<string>) {
    return await this.prisma.pets.findMany({
      where: {
        status: PetStatus.LOST,
        tags: {
          some: {
            id: {
              in: tags_ids
            }
          }
        }
      }
    });
  }

  async findAllByShelter(shelter_id: string) {
    return await this.prisma.pets.findMany({
      where: {
        shelter_id,
        status: PetStatus.AVAILABLE
      }
    });
  }

  async findAllByTagsAndFilters(tags_ids: Array<string>, filters?: Any) {
    const and_clause = Array();
    for (let i of tags_ids) {
      and_clause.push({
        tags: {
          some: {
            id: i
          }
        }
      });
    }
    //TODO ao retornar os shelters neste relacionamento não posso retornar login e password
    return await this.prisma.pets.findMany({
      where: {
        ...filters,
        AND: and_clause
      },
      include: {
        shelters: {
          select: {
            id: true,
            name: true,
            address: true,
            phone: true
          }
        },
        tags: true
      }
    });
  }

  async findById(id: string) {
    return await this.prisma.pets.findUnique({
      where: {
        id
      },
      include: {
        shelters: true,
        tags: true
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
    });
  }

  async updateOwner(id: string, owner_id: string) {
    return await this.prisma.pets.update({
      where: {
        id
      },
      data: {
        owner_id: owner_id,
        updated_at: new Date()
      }
    });
  }

  async addTempHome(id: string, temp_home_id: string) {
    return await this.prisma.pets.update({
      where: {
        id
      },
      data: {
        status: PetStatus.TEMP_ALOCATED,
        temp_home_id: temp_home_id,
        updated_at: new Date()
      }
    });
  }

  async update(id: string, pet: Partial<PetsDTO>) {
    const updateData: any = {};
    if (pet.name !== undefined) updateData.name = pet.name;
    if (pet.description !== undefined) updateData.description = pet.description;
    if (pet.status !== undefined) updateData.status = pet.status;
    if (pet.type !== undefined) updateData.type = pet.type;
    if (pet.img_url !== undefined) updateData.img_url = pet.img_url;
    if (pet.shelter_id !== undefined) updateData.shelter_id = pet.shelter_id;
    if (pet.pet_tag_ids !== undefined) {
      updateData.tags = {
        connect: pet.pet_tag_ids.map((id) => ({ id })),
      };
    }

    return await this.prisma.pets.update({
      where: { id },
      data: updateData,
    });
  }
}
