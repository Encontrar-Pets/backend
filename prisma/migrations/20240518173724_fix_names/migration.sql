/*
  Warnings:

  - You are about to drop the column `applicant_owner_id` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the `applicant_owner` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pet_owner` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `shelter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_applicant_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_shelter_id_fkey";

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "applicant_owner_id",
ADD COLUMN     "owner_id" TEXT;

-- DropTable
DROP TABLE "applicant_owner";

-- DropTable
DROP TABLE "pet_owner";

-- DropTable
DROP TABLE "shelter";

-- CreateTable
CREATE TABLE "owners" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "owners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shelters" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" JSONB NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shelters_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "owners"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_shelter_id_fkey" FOREIGN KEY ("shelter_id") REFERENCES "shelters"("id") ON DELETE SET NULL ON UPDATE CASCADE;
