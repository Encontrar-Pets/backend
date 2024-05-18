/*
  Warnings:

  - You are about to alter the column `type` on the `pets` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1)`.

*/
-- AlterTable
ALTER TABLE "pets" ALTER COLUMN "type" SET DATA TYPE VARCHAR(1);
