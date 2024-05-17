import { FastifyInstance } from 'fastify';
import { getPetsHandler } from '../../controllers/pets';

module.exports = async function (fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/',
    handler: getPetsHandler
  });
};
