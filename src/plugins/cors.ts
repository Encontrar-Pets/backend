'use strict';

import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

/**
 * This plugin enables the use of CORS in a Fastify application.
 *
 * @see https://github.com/fastify/fastify-cors
 */
module.exports = fp(async function (fastify: FastifyInstance) {
  fastify.register(require('@fastify/cors'), {
    origin: (origin, callback) => {
      callback(null, true);
    },
    credentials: true
  });
});
