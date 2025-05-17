/*
  Warnings:

  - You are about to drop the column `comments` on the `StorieData` table. All the data in the column will be lost.
  - You are about to drop the column `reports` on the `StorieData` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StorieData" DROP COLUMN "comments",
DROP COLUMN "reports",
ADD COLUMN     "comments_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "marked_cound" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "reports_count" INTEGER NOT NULL DEFAULT 0;
