import { FastifyInstance } from 'fastify';
import { getByIdHandler } from '../../../controllers/pets';

module.exports = async function (fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/',
    handler: getByIdHandler
  });
};
