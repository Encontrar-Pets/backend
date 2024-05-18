import { FastifyReply, FastifyRequest } from 'fastify';
import { logger } from '../../services/logger';

import { SheltersRepository } from '../../models/shelters/shelters-model';
import prisma from '../../utils/prisma';

import { SHELTERS } from '../../mocks';

const sheltersRepository = new SheltersRepository(prisma);

export const getSheltersHandler = async (
  req: FastifyRequest<{
    Body: any;
  }>,
  res: FastifyReply
) => {
  try {
    // mock data
    // const data = SHELTERS;

    const data = await sheltersRepository.findAll();

    res.code(200).send({
      message: 'Shelters fetched successfully',
      data: data
    });
  } catch (err) {
    logger.error(err);
    res.code(500).send({
      message: 'Internal Server Error'
    });
  }
};
