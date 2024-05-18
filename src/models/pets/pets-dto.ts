export enum PetStatus {
  AVAILABLE = 'A',
  PENDING = 'P',
  RECOVERED = 'R',
  LOST = 'L',
  TEMP_ALOCATED = 'T',
}

export class PetsDTO {
    name!: string;
    description!: string;
    type!: string;
    id?: string;
    status?: PetStatus;
    temp_home_id?: string;
    owner_id?: string;
    shelter_id?: string;
    img_url?: string;
    pet_tag_ids?: Array<string>;
  }
