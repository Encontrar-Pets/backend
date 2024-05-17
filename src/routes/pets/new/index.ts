import { FastifyInstance } from 'fastify';
import { newPetHandler } from '../../../controllers/pets';

module.exports = async function (fastify: FastifyInstance) {
  fastify.route({
    method: 'POST',
    url: '/',
    handler: newPetHandler
  });
};
