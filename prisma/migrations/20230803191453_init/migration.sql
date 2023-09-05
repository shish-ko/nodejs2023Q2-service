/*
  Warnings:

  - Added the required column `artistId` to the `Album` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "artistId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "version" SET DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
