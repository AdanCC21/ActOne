/*
  Warnings:

  - The `followers` column on the `UserPublicData` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `following` column on the `UserPublicData` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "UserPublicData" DROP COLUMN "followers",
ADD COLUMN     "followers" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
DROP COLUMN "following",
ADD COLUMN     "following" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
