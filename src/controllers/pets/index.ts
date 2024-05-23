import assert from 'assert';
import { FastifyReply, FastifyRequest } from 'fastify';

import { logger } from '../../services/logger';
import prisma from '../../utils/prisma';

import { PetsRepository } from '../../models/pets/pets-model';
import { PetStatus, PetType } from '../../models/pets/pets-dto';
import { OwnerRepository } from '../../models/owner/owner-model';
import { TagsRepository } from '../../models/tags/tags-model';

const petsRepository = new PetsRepository(prisma);
const ownerRepository = new OwnerRepository(prisma);
const tagsRepository = new TagsRepository(prisma);

export const getPetsHandler = async (
  req: FastifyRequest<{
    Querystring: {
      shelter_id: string;
      status: string;
      pet_tag_ids?: string;
      type?: string;
    };
  }>,
  res: FastifyReply
) => {
  try {
    const { shelter_id, status, pet_tag_ids, type } = req.query;
    assert(shelter_id);
    assert(status);

    var filtered_pets = [];

    const filters = {
      type,
      status,
      shelter_id
    };

    const split_tags = pet_tag_ids ? pet_tag_ids.split(',') : [];

    filtered_pets = await petsRepository.findAllByTagsAndFilters(
      split_tags,
      filters
    );

    res.code(200).send({
      message: 'Pets fetched successfully',
      data: filtered_pets
    });
  } catch (err) {
    logger.error(err);
    res.code(500).send({
      message: 'Internal Server Error'
    });
  }
};

export const applyOwnerHandler = async (
  req: FastifyRequest<{
    Body: any;
  }>,
  res: FastifyReply
) => {
  try {
    const { pet_id, owner_name, owner_phone, image } = req.body;

    // mock data section

    /* 
    check if owner not exists in applicant_owner -> phone field
      insert data in applicant_owner
    else
      get applicant_owner_id

    update pets table with applicant_owner_id
    */

    res.code(200).send({
      message: 'Applied successfully',
      data: {}
    });
  } catch (err) {
    logger.error(err);
    res.code(500).send({
      message: 'Internal Server Error'
    });
  }
};

export const applyHomeHandler = async (
  req: FastifyRequest<{
    Body: any;
  }>,
  res: FastifyReply
) => {
  try {
    const pet_id = req.body?.pet_id;
    const name = req.body?.name;
    const phone = req.body?.phone;
    const address = req.body?.address;
    const terms_accepted = req.body?.terms_accepted;
    const image = req.body?.image;

    // mock data section

    /* 
    check if home not exists in temp_home -> phone field
      insert data in temp_home
    else
      get temp_home_id

    update pets table with temp_home_id
    */

    res.code(200).send({
      message: 'Applied successfully',
      data: {}
    });
  } catch (err) {
    logger.error(err);
    res.code(500).send({
      message: 'Internal Server Error'
    });
  }
};

export const newPetHandler = async (
  req: FastifyRequest<{
    Body: {
      name: string;
      description: string;
      type: string;
      status: string;
      img_url: string;
      pet_tag_ids: Array<string>;
      shelter_id?: string;
      owner?: {
        phone: string;
        name: string;
      };
      new_pet_tag?: Array<string>;
    };
  }>,
  res: FastifyReply
) => {
  try {
    const {
      name,
      description,
      type,
      status,
      img_url,
      pet_tag_ids,
      shelter_id,
      owner,
      new_pet_tag
    } = req.body;

    assert(name);
    assert(description);
    assert(type);
    assert(status);
    assert(pet_tag_ids);
    assert(img_url);

    assert(Object.values(PetType).includes(type));
    assert(PetStatus.LOST == status || PetStatus.AVAILABLE == status);

    if (status !== PetStatus.LOST) {
      assert(shelter_id);
    }

    if (new_pet_tag) {
      for (const tag of new_pet_tag) {
        let _tag_id = await tagsRepository.create({ description: tag });
        pet_tag_ids.push(_tag_id.id);
      }
    }

    const pet = await petsRepository.create({
      name,
      description,
      type,
      status,
      shelter_id,
      img_url,
      pet_tag_ids
    });

    if (status == PetStatus.LOST) {
      assert(owner);
      assert(owner.phone);
      assert(owner.name);
      var db_owner = await ownerRepository.findByPhone(owner.phone);
      if (!db_owner) {
        db_owner = await ownerRepository.create(owner);
      }
      await petsRepository.updateOwner(pet.id, db_owner.id);
    }

    res.code(200).send({
      message: 'New pet created successfully',
      data: {}
    });
  } catch (err) {
    logger.error(err);
    res.code(500).send({
      message: 'Internal Server Error'
    });
  }
};

export const getByIdHandler = async (
  req: FastifyRequest<{
    Querystring: {
      _id: string;
    };
  }>,
  res: FastifyReply
) => {
  try {

    const { _id } = req.query;
    assert(_id);

    const result = await petsRepository.findById(_id);
    if (!result) {
      return res.code(404).send({
        message: 'Pet not found'
      });
    }
    res.code(200).send({
      message: 'Pet fetched successfully',
      data: result
    });
  } catch (err) {
    logger.error(err);
    res.code(500).send({
      message: 'Internal Server Error'
    });
  }
};

export const updatePetHandler = async (
  req: FastifyRequest<{
    Params: { id: string };
    Body: Partial<{
      name: string;
      description: string;
      type: PetType;
      status: PetStatus;
      img_url: string;
      pet_tag_ids: Array<string>;
      shelter_id?: string;
      owner?: {
        phone: string;
        name: string;
      };
      new_pet_tag?: Array<string>;
    }>;
  }>,
  res: FastifyReply
) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      type,
      status,
      img_url,
      pet_tag_ids,
      shelter_id,
      owner,
      new_pet_tag,
    } = req.body;

    const existingPet = await petsRepository.findById(id);
    if (!existingPet) {
      return res.code(404).send({ message: 'Pet not found' });
    }

    if (new_pet_tag) {
      for (const tag of new_pet_tag) {
        let _tag_id = await tagsRepository.create({ description: tag });
        pet_tag_ids?.push(_tag_id.id);
      }
    }

    const updatedPet = {
      name: name ?? existingPet.name,
      description: description ?? existingPet.description,
      type: type ?? existingPet.type,
      status: status ?? existingPet.status,
      img_url: img_url ?? existingPet.img_url,
      pet_tag_ids: pet_tag_ids ?? existingPet.tags.map(tag => tag.id),
      shelter_id: shelter_id ?? existingPet.shelter_id,
    };

    if (type) {
      assert(Object.values(PetType).includes(type));
    }
    if (status !== undefined) {
      assert(Object.values(PetStatus).includes(status));
    }
    await petsRepository.update(id, updatedPet);
    if (status === PetStatus.LOST && owner) {
      assert(owner.phone);
      assert(owner.name);

      let db_owner = await ownerRepository.findByPhone(owner.phone);
      if (!db_owner) {
        db_owner = await ownerRepository.create(owner);
      }
      await petsRepository.updateOwner(id, db_owner.id);
    }

    res.code(200).send({
      message: 'Pet updated successfully',
      data: updatedPet,
    });
  } catch (err) {
    console.error(err);
    res.code(500).send({
      message: 'Internal Server Error',
    });
  }
};
