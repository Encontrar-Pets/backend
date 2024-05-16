import { FastifyInstance } from 'fastify';
import { SHELTERS } from '../../mocks';

module.exports = async function (fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/',
    handler: function (request, reply) {
      reply.send(SHELTERS);
    }
  });
};
