export enum PetStatus {
  LOST = 'L',
  AVAILABLE = 'A',
  PENDING_RECOVERED = 'P',
  RECOVERED = 'R',
  PENDING_TEMP_ALOCATED = 'X',
  TEMP_ALOCATED = 'T'
}

export enum PetType {
  DOG = 'D',
  CAT = 'C'
}
export class PetsDTO {
  name!: string;
  description!: string;
  type!: PetType;
  id?: string;
  status?: PetStatus;
  temp_home_id?: string;
  owner_id?: string;
  shelter_id?: string;
  img_url?: string;
  pet_tag_ids?: Array<string>;
}
