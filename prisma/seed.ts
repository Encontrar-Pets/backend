import { PrismaClient } from '@prisma/client';
import { PETS, SHELTERS } from '../src/mocks';

const prisma = new PrismaClient();

async function main() {
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
  const c_shelters = await prisma.shelter.createManyAndReturn({
    data: shelters
  });
  console.log('Added shelters');

  const lost_pets = new Array();
  for (let pet of PETS) {
    lost_pets.push({
      name: pet.name,
      description: pet.description,
      type: pet.description,
      status: 'A',
      img_url: pet.image,
      shelter_id: c_shelters[pet.shelter_id - 1]['id']
    });
  }

  const c_lost_pets = await prisma.pets.createMany({
    data: lost_pets
  });
  console.log('Added lost pets');
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
