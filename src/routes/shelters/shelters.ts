import { FastifyInstance } from 'fastify';

const MOCK_RESPONSE = [
  { id: 1, name: 'Abrigo 1', phone: '1733239999', address: 'Avenida 1' },
  { id: 2, name: 'Abrigo 2', phone: '1733239999', address: 'Avenida 2' },
  { id: 3, name: 'Abrigo 3', phone: '1733239999', address: 'Avenida 3' },
  { id: 4, name: 'Abrigo 4', phone: '1733239999', address: 'Avenida 4' }
];

module.exports = async function (fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/',
    handler: function (request, reply) {
      reply.send(MOCK_RESPONSE);
    }
  });
};
