import { FastifyInstance } from 'fastify';

import { applyHomeHandler } from '../../../../controllers/pets';

module.exports = async function (fastify: FastifyInstance) {
  fastify.route({
    method: 'POST',
    url: '/',
    handler: applyHomeHandler
  });
};
