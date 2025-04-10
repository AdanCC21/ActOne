/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "UserPublicData" (
    "id" SERIAL NOT NULL,
    "user_name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "profile_image_url" TEXT NOT NULL DEFAULT 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfwfzTPVw45cJcHNUp3sWUWLOkYAfQlAEBOQ&s',
    "followers" INTEGER NOT NULL DEFAULT 0,
    "following" INTEGER NOT NULL DEFAULT 0,
    "published_stories" INTEGER[] DEFAULT ARRAY[]::INTEGER[],

    CONSTRAINT "UserPublicData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPublicData_user_name_key" ON "UserPublicData"("user_name");
