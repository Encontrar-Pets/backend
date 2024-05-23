import { FastifyInstance } from 'fastify';
import { updatePetHandler } from '../../../controllers/pets';

module.exports = async function (fastify: FastifyInstance) {
  fastify.route({
    method: 'PUT',
    url: '/:id',
    handler: updatePetHandler
  });
};
