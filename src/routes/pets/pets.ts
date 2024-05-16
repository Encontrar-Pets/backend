import { FastifyInstance } from 'fastify';
import { PETS } from '../../mocks';

module.exports = async function (fastify: FastifyInstance) {
  fastify.route({
    method: 'POST',
    url: '/',
    handler: function (request, reply) {
      const shelter: number = request.body?.shelter_id;
      const tags: Array<string> = request.body?.tags;
      console.log({ shelter, tags });

      // mock data section
      var filtered_pets = PETS.filter((el) => el.shelter_id == shelter);

      if (tags) {
        tags.forEach((t) => {
          filtered_pets = filtered_pets.filter(
            (el1) => el1?.pet_tag_names.indexOf(t) == 0
          );
        });
      }

      reply.send(filtered_pets);
      // mock data section
    }
  });
};
