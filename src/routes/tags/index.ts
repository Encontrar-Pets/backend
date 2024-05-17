import { FastifyInstance } from 'fastify';
import { getTagsHandler } from '../../controllers/tags';

module.exports = async function (fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/',
    handler: getTagsHandler
  });
};
