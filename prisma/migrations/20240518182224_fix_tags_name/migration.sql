/*
  Warnings:

  - You are about to drop the `_pet_tagsTopets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pet_tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_pet_tagsTopets" DROP CONSTRAINT "_pet_tagsTopets_A_fkey";

-- DropForeignKey
ALTER TABLE "_pet_tagsTopets" DROP CONSTRAINT "_pet_tagsTopets_B_fkey";

-- DropTable
DROP TABLE "_pet_tagsTopets";

-- DropTable
DROP TABLE "pet_tags";

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_petsTotags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_petsTotags_AB_unique" ON "_petsTotags"("A", "B");

-- CreateIndex
CREATE INDEX "_petsTotags_B_index" ON "_petsTotags"("B");

-- AddForeignKey
ALTER TABLE "_petsTotags" ADD CONSTRAINT "_petsTotags_A_fkey" FOREIGN KEY ("A") REFERENCES "pets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_petsTotags" ADD CONSTRAINT "_petsTotags_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
