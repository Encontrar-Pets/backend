/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `owners` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "owners_phone_key" ON "owners"("phone");
