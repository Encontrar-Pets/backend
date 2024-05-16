import { FastifyInstance } from 'fastify';
import { PETS } from '../../mocks';

module.exports = async function (fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/',
    handler: function (request, reply) {
      const shelter: number = request.query?.shelter_id;
      var tag_ids: Array<number> | undefined = undefined;
      if (request.query?.tag_ids) {
        tag_ids = request.query?.tag_ids.split(',');
      }

      // mock data section
      // orm here to get pets from database
      var filtered_pets = PETS.filter((el) => el.shelter_id == shelter);

      if (tag_ids) {
        tag_ids.forEach((t) => {
          filtered_pets = filtered_pets.filter((el1) => {
            return el1?.pet_tag_ids.indexOf(Number(t)) >= 0;
          });
        });
      }

      reply.send(filtered_pets);
      // mock data section
    }
  });
};
