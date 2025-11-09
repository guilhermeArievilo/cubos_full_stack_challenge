/*
  Warnings:

  - Changed the type of `rating` on the `Movie` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Rating" AS ENUM ('LIVRE', 'DEZ_ANOS', 'DOZE_ANOS', 'QUATORZE_ANOS', 'DEZESSEIS_ANOS', 'DEZOITO_ANOS');

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "rating",
ADD COLUMN     "rating" "Rating" NOT NULL;
