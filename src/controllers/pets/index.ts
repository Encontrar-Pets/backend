import { FastifyReply, FastifyRequest } from 'fastify';
import { logger } from '../../services/logger';
import { PETS } from '../../mocks';

export const getPetsHandler = async (
  req: FastifyRequest<{
    Body: any;
  }>,
  res: FastifyReply
) => {
  try {
    const shelter: number = req.query?.shelter_id;
    var tag_ids: Array<number> | undefined = undefined;
    if (req.query?.tag_ids) {
      tag_ids = req.query?.tag_ids.split(',');
    }

    // mock data section
    // orm here to get pets from database
    var filtered_pets = PETS.filter((el) => el.shelter_id == shelter);

    if (tag_ids) {
      tag_ids.forEach((t) => {
        filtered_pets = filtered_pets.filter((el1) => {
          return el1?.pet_tag_ids.indexOf(Number(t)) >= 0;
        });
      });
    }

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
    const { name, description, type, image, tags_ids, shelter_id } = req.body;

    logger.info({ name, description, type, image, tags_ids, shelter_id });
    console.log({ name, description, type, image, tags_ids, shelter_id });

    // mock data section

    /* 
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
