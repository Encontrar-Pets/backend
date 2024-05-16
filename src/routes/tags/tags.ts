import { FastifyInstance } from 'fastify';
import { TAGS } from '../../mocks';

module.exports = async function (fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/',
    handler: function (request, reply) {
      // mock data section
      // orm here to get tags from database
      reply.send(TAGS);
      // mock data section
    }
  });
};
