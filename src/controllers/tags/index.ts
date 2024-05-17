import { FastifyReply, FastifyRequest } from 'fastify';
import { TAGS } from '../../mocks';
import { logger } from '../../services/logger';

export const getTagsHandler = async (
  req: FastifyRequest<{
    Body: any;
  }>,
  res: FastifyReply
) => {
  try {
    res.code(200).send({
      message: 'Tags fetched successfully',
      data: TAGS
    });
  } catch (err) {
    logger.error(err);
    res.code(500).send({
      message: 'Internal Server Error'
    });
  }
};
