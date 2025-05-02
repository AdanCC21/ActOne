/*
  Warnings:

  - You are about to drop the column `act_number` on the `ActData` table. All the data in the column will be lost.
  - The `title` column on the `ActData` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `content` column on the `ActData` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ActData" DROP COLUMN "act_number",
DROP COLUMN "title",
ADD COLUMN     "title" TEXT[],
DROP COLUMN "content",
ADD COLUMN     "content" TEXT[];
