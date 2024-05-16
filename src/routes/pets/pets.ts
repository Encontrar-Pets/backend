import { FastifyInstance } from 'fastify';
import { PETS } from '../../mocks';
import {} from '../shelters/shelters';

module.exports = async function (fastify: FastifyInstance) {
  // fastify.route({
  //   method: 'GET',
  //   url: '/',
  //   handler: function (request, reply) {
  //     reply.send(PETS);
  //   }
  // });

  // schema: {
  //   querystring: {
  //     type: 'object',
  //     properties: {
  //       shelter_id: {
  //         type: 'string',
  //         default: 1
  //       }
  //     }
  //   }
  // },
  fastify.route({
    method: 'GET',
    url: '/',
    handler: function (request, reply) {
      console.log(request.query);
      console.log(request.params);
      reply.send(PETS);
    }
  });
};
