import { FastifyInstance } from 'fastify';

const MOCK_RESPONSE = [
  {
    id: 1,
    name: 'Regis Reginaldo',
    description: 'Comeu o parachoque do carro, caramelo',
    type: 'D',
    shelter_id: 1,
    pet_tags: ['caramelo', 'medio porte', '1-2 anos', 'macho']
  },
  {
    id: 2,
    name: 'Dora Cristina',
    description: 'Cachorra ansiosa, faz xixi de ansiedade',
    type: 'D',
    shelter_id: 2,
    pet_tags: ['branco e preto', 'medrosa', 'fêmea', 'medio porte', '1-2 anos']
  },
  {
    id: 3,
    name: 'Geleia de Café',
    description: 'Gato preto maluco',
    type: 'C',
    shelter_id: 3,
    pet_tags: ['preto', 'macho', '0-1 ano']
  },
  {
    id: 4,
    name: 'Gelatina Manoela',
    description: 'Filha mais linda do mundo, minha preferida',
    type: 'C',
    shelter_id: 4,
    pet_tags: ['tricolor', 'fêmea', '1-2 anos']
  }
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
