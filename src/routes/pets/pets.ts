import { FastifyInstance } from 'fastify';
import { PETS } from '../../mocks';

module.exports = async function (fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/',
    handler: function (request, reply) {
      const shelter: number = request.query?.shelter_id;
      var tags: Array<string> | undefined = undefined;
      if (request.query?.tags) {
        tags = request.query?.tags.split(',');
      }
      console.log({ shelter });

      // mock data section
      var filtered_pets = PETS.filter((el) => el.shelter_id == shelter);

      if (tags) {
        // tags = tags.split(',');
        console.log({ tags });
        console.log(filtered_pets.length);
        tags.forEach((t) => {
          console.log(filtered_pets.length);
          filtered_pets = filtered_pets.filter((el1) => {
            console.log(el1.name);
            return el1?.pet_tag_description.indexOf(t) == 0;
          });
        });
      }

      reply.send(filtered_pets);
      // mock data section
    }
  });
};
