/*
  Warnings:

  - Added the required column `act_number` to the `ActData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ActData" ADD COLUMN     "act_number" INTEGER NOT NULL;
