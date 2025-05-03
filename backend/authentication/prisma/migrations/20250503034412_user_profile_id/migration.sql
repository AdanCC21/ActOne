/*
  Warnings:

  - You are about to drop the column `user_id` on the `Authentication` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_profile_id]` on the table `Authentication` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_profile_id` to the `Authentication` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Authentication_user_id_key";

-- AlterTable
ALTER TABLE "Authentication" DROP COLUMN "user_id",
ADD COLUMN     "user_profile_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Authentication_user_profile_id_key" ON "Authentication"("user_profile_id");
