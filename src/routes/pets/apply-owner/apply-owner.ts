import { FastifyInstance } from 'fastify';

module.exports = async function (fastify: FastifyInstance) {
  fastify.route({
    method: 'POST',
    url: '/',
    handler: function (request, reply) {
      const pet_id = request.body?.pet_id;
      const owner_name = request.body?.owner_name;
      const owner_phone = request.body?.owner_phone;
      const image = request.body?.image;

      // mock data section

      /* 
      check if owner not exists in applicant_owner -> phone field
        insert data in applicant_owner
      else
        get applicant_owner_id

      update pets table with applicant_owner_id
      */

      reply.send({});
      // mock data section
    }
  });
};
