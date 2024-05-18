import { PrismaClient } from '@prisma/client';
import { OwnerDTO } from './owner-dto';

export class OwnerRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(owner: OwnerDTO) {
    return await this.prisma.owners.create({
      data: {
        name: owner.name,
        phone: owner.phone
      }
    });
  }

  async findByName(name: string) {
    return await this.prisma.owners.findMany({
      where: {
        name: name
      }
    });
  }
  async findByPhone(phone: string) {
    return await this.prisma.owners.findFirst({
      where: {
        phone: phone
      }
    });
  }
  async findById(id: string) {
    return await this.prisma.owners.findUnique({
      where: {
        id: id
      }
    });
  }
}
