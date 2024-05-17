import { FastifyInstance } from 'fastify';

import { applyOwnerHandler } from '../../../controllers/pets';

module.exports = async function (fastify: FastifyInstance) {
  fastify.route({
    method: 'POST',
    url: '/',
    handler: applyOwnerHandler
  });
};
