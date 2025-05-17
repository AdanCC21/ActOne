/*
  Warnings:

  - You are about to drop the column `marked_cound` on the `StorieData` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StorieData" DROP COLUMN "marked_cound",
ADD COLUMN     "marked_count" INTEGER NOT NULL DEFAULT 0;
