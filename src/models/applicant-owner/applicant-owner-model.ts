import { PrismaClient } from "@prisma/client";
import { AplicantOwnerDTO } from "./applicant-owner-dto";

export class AplicantOwnerRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async create(aplicant: AplicantOwnerDTO) {
        return await this.prisma.applicant_owner.create({
            data: {
                name: aplicant.name,
                phone: aplicant.phone
            }
        });
    }

    async findByName(name: string) {
         return await this.prisma.applicant_owner.findMany({
            where: {
                name: name
            }
         });       
    }
    async findByPhone(phone: string) {
         return await this.prisma.applicant_owner.findMany({
            where: {
                phone: phone
            }
         });       
    }
    async findById(id: string) {
         return await this.prisma.applicant_owner.findUnique({
            where: {
                id: id
            }
         });       
    }
}