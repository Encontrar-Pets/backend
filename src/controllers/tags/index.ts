import { FastifyReply, FastifyRequest } from 'fastify';
import { logger } from '../../services/logger';

import { TagsRepository } from '../../models/tags/tags-model';
import prisma from '../../utils/prisma';

import { TAGS } from '../../mocks';

const tagsRepository = new TagsRepository(prisma);

export const getTagsHandler = async (
  req: FastifyRequest<{
    Body: any;
  }>,
  res: FastifyReply
) => {
  try {
    // mock data
    // const data = TAGS;

    const data = await tagsRepository.findAll();

    res.code(200).send({
      message: 'Tags fetched successfully',
      data: data
    });
  } catch (err) {
    logger.error(err);
    res.code(500).send({
      message: 'Internal Server Error'
    });
  }
};
