// const express = require('express');
// const { PrismaClient } = require('@prisma/client');

// const prisma = new PrismaClient();
// const app = express();
// app.use(express.json());


// app.post('/pets', async (req, res) => {
//   const { name, description, type, temp_home_id, applicant_owner_id } = req.body;
//   const pet = await prisma.pets.create({
//     data: {
//       name,
//       description,
//       type,
//       temp_home_id,
//       applicant_owner_id,
//     },
//   });
//   res.json(pet);
// });

// app.get('/pets', async (req, res) => {
//   const pets = await prisma.pets.findMany();
//   res.json(pets);
// });


// app.listen(3000, () => {
//   console.log('Server is running on http://localhost:3000');
// });