import { FastifyInstance } from 'fastify';
import { SHELTERS } from '../../mocks';

module.exports = async function (fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/',
    handler: function (request, reply) {
      // mock data section
      // orm here to get shelters from database
      reply.send(SHELTERS);
      // mock data section
    }
  });
};
