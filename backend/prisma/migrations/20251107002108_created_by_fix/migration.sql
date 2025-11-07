/*
  Warnings:

  - You are about to drop the column `createdByid` on the `Movie` table. All the data in the column will be lost.
  - Added the required column `createdById` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_createdByid_fkey";

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "createdByid",
ADD COLUMN     "createdById" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
