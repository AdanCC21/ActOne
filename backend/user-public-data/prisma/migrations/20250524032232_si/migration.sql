-- AlterTable
ALTER TABLE "UserPublicData" ADD COLUMN     "stories_liked" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
