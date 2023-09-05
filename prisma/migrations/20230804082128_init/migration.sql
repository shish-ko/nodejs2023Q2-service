/*
  Warnings:

  - The primary key for the `FavoriteAlbum` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `FavoriteAlbum` table. All the data in the column will be lost.
  - The primary key for the `FavoriteArtist` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `FavoriteArtist` table. All the data in the column will be lost.
  - The primary key for the `FavoriteTrack` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `FavoriteTrack` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[albumId]` on the table `FavoriteAlbum` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[artistId]` on the table `FavoriteArtist` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[trackId]` on the table `FavoriteTrack` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "FavoriteAlbum" DROP CONSTRAINT "FavoriteAlbum_albumId_fkey";

-- DropForeignKey
ALTER TABLE "FavoriteArtist" DROP CONSTRAINT "FavoriteArtist_artistId_fkey";

-- DropForeignKey
ALTER TABLE "FavoriteTrack" DROP CONSTRAINT "FavoriteTrack_trackId_fkey";

-- AlterTable
ALTER TABLE "FavoriteAlbum" DROP CONSTRAINT "FavoriteAlbum_pkey",
DROP COLUMN "id";

-- AlterTable
ALTER TABLE "FavoriteArtist" DROP CONSTRAINT "FavoriteArtist_pkey",
DROP COLUMN "id";

-- AlterTable
ALTER TABLE "FavoriteTrack" DROP CONSTRAINT "FavoriteTrack_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteAlbum_albumId_key" ON "FavoriteAlbum"("albumId");

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteArtist_artistId_key" ON "FavoriteArtist"("artistId");

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteTrack_trackId_key" ON "FavoriteTrack"("trackId");

-- AddForeignKey
ALTER TABLE "FavoriteTrack" ADD CONSTRAINT "FavoriteTrack_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteAlbum" ADD CONSTRAINT "FavoriteAlbum_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteArtist" ADD CONSTRAINT "FavoriteArtist_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
