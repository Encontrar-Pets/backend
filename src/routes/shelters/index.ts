import { FastifyInstance } from 'fastify';
import { getSheltersHandler } from '../../controllers/shelters';

module.exports = async function (fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/',
    handler: getSheltersHandler
  });
};
