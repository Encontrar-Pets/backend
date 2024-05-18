import { PrismaClient } from '@prisma/client';
import { PETS, SHELTERS, TAGS } from '../src/mocks';

const prisma = new PrismaClient();

async function main() {
  // tags
  const tags = Array();
  for (let tag of TAGS) {
    tags.push({
      description: tag.description
    });
  }
  const c_tags = await prisma.tags.createManyAndReturn({
    data: tags
  });
  console.log('Added tags');
  //

  // shelters
  const shelters = Array();
  for (let shelter of SHELTERS) {
    shelters.push({
      name: shelter.name,
      address: shelter.address,
      login: 'abrigo' + shelter.id + '@email.com',
      password: '1234',
      phone: shelter.phone
    });
  }
  const c_shelters = await prisma.shelters.createManyAndReturn({
    data: shelters
  });
  console.log('Added shelters');
  //

  // lost pets
  const lost_pets = new Array();
  const c_lost_pets = new Array();
  for (let pet of PETS) {
    const tag_ids = new Array();

    for (let t of pet.pet_tag_ids) {
      tag_ids.push(c_tags[t-1]['id']);
    }

    c_lost_pets.push(
      await prisma.pets.create({
        data: {
          name: pet.name,
          description: pet.description,
          type: pet.type,
          status: 'A',
          img_url: pet.image,
          shelter_id: c_shelters[pet.shelter_id - 1]['id'],
          tags: {
            connect: tag_ids.map((v) => ({ id: v }))
          }
        }
      })
    );
  }
  console.log('Added lost pets');
  //
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
