/*
  Warnings:

  - You are about to drop the column `backdrop_path` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `poster_path` on the `Movie` table. All the data in the column will be lost.
  - Added the required column `backdropPath` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `posterPath` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "backdrop_path",
DROP COLUMN "poster_path",
ADD COLUMN     "backdropPath" TEXT NOT NULL,
ADD COLUMN     "posterPath" TEXT NOT NULL;
