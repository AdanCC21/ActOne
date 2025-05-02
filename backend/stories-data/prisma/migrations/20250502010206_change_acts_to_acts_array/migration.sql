/*
  Warnings:

  - The `acts` column on the `StorieData` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "StorieData" DROP COLUMN "acts",
ADD COLUMN     "acts" INTEGER[];
