/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - Made the column `description` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `profile_image_url` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `followers` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `following` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
ADD COLUMN     "published_stories" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "description" SET DEFAULT '',
ALTER COLUMN "profile_image_url" SET NOT NULL,
ALTER COLUMN "profile_image_url" SET DEFAULT 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfwfzTPVw45cJcHNUp3sWUWLOkYAfQlAEBOQ&s',
ALTER COLUMN "followers" SET NOT NULL,
ALTER COLUMN "followers" SET DEFAULT 0,
ALTER COLUMN "following" SET NOT NULL,
ALTER COLUMN "following" SET DEFAULT 0;
