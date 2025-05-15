/*
  Warnings:

  - Added the required column `synopsis` to the `StorieData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StorieData" ADD COLUMN     "synopsis" TEXT NOT NULL;
