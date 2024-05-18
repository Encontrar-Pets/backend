import { FastifyReply, FastifyRequest } from 'fastify';
import { logger } from '../../services/logger';
import { PetsRepository } from '../../models/pets/pets-model';
import prisma from '../../utils/prisma';

import { PETS } from '../../mocks';
import assert from 'assert';

const petsRepository = new PetsRepository(prisma);

export const getPetsHandler = async (
  req: FastifyRequest<{
    Querystring: {
      shelter_id: string;
      status: string;
      tags?: string;
      type?: string;
    };
  }>,
  res: FastifyReply
) => {
  try {
    const { shelter_id, status, tags, type } = req.query;
    assert(shelter_id);
    assert(status);

    var filtered_pets = [];

    const filters = {
      type,
      status,
      shelter_id
    };

    const split_tags = tags ? tags.split(',') : [];

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
    Body: any;
  }>,
  res: FastifyReply
) => {
  try {
    const { name, description, type, image, tags, shelter_id } = req.body;

    logger.info({ name, description, type, image, tags, shelter_id });
    console.log({ name, description, type, image, tags, shelter_id });

    // mock data section

    /* 
    if status = L
      check if owner not exists in applicant_owner -> phone field
        insert owner_id
      get owner_id
    insert new data in pets
    insert pet_tagas in pet_tags
    */

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
