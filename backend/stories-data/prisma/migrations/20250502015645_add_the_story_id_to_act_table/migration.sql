/*
  Warnings:

  - Added the required column `story_id` to the `ActData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ActData" ADD COLUMN     "story_id" INTEGER NOT NULL,
ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "title" SET DATA TYPE TEXT,
ALTER COLUMN "content" SET NOT NULL,
ALTER COLUMN "content" SET DATA TYPE TEXT;
