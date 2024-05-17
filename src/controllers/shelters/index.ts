import { FastifyReply, FastifyRequest } from 'fastify';
import { SHELTERS } from '../../mocks';
import { logger } from '../../services/logger';

export const getSheltersHandler = async (
  req: FastifyRequest<{
    Body: any;
  }>,
  res: FastifyReply
) => {
  try {
    res.code(200).send({
      message: 'Shelters fetched successfully',
      data: SHELTERS
    });
  } catch (err) {
    logger.error(err);
    res.code(500).send({
      message: 'Internal Server Error'
    });
  }
};
