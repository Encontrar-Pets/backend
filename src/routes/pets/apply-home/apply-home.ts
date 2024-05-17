import { FastifyInstance } from 'fastify';

module.exports = async function (fastify: FastifyInstance) {
  fastify.route({
    method: 'POST',
    url: '/',
    handler: function (request, reply) {
      const pet_id = request.body?.pet_id;
      const name = request.body?.name;
      const phone = request.body?.phone;
      const address = request.body?.address;
      const terms_accepted = request.body?.terms_accepted;
      const image = request.body?.image;

      // mock data section

      /* 
      check if home not exists in temp_home -> phone field
        insert data in temp_home
      else
        get temp_home_id

      update pets table with temp_home_id
      */

      reply.send({});
      // mock data section
    }
  });
};
