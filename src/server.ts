'use strict';

import 'dotenv/config';
import path from 'path';
import AutoLoad from '@fastify/autoload';
import { RequestListener, ServerResponse } from 'http';
import { FastifyRequest, FastifyReply } from 'fastify';

const fastify = require('fastify')({
  serializers: {
    res(reply: FastifyReply) {
      return {
        statusCode: reply.statusCode
      };
    },
    req(req: FastifyRequest) {
      return {
        method: req.method,
        url: req.url,
        hostname: req.hostname,
        remoteAddress: req.ip,
        remotePort: req.connection.remotePort,
        headers: req.headers
      };
    }
  }
});

fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'routes')
});

fastify.addContentTypeParser(
  '*',
  function (req: RequestListener, res: ServerResponse, done: Function) {
    done();
  }
);

fastify
  .listen({ port: 8080 })
  .then(async () => {
    console.log(`Server Listening on Port ${process.env.PORT}`);
  })
  .catch((err: Error) => {
    console.log(err);
    console.log(err);
  });
