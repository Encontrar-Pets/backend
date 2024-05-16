import { FastifyInstance } from 'fastify';
import { SHELTERS } from '../../mocks';

module.exports = async function (fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/',
    handler: function (request, reply) {
      // mock data section
      reply.send(SHELTERS);
      // mock data section
    }
  });
};
