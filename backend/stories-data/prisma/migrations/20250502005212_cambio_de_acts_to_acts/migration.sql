/*
  Warnings:

  - You are about to drop the column `Acts` on the `StorieData` table. All the data in the column will be lost.
  - Added the required column `acts` to the `StorieData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StorieData" DROP COLUMN "Acts",
ADD COLUMN     "acts" INTEGER NOT NULL;
