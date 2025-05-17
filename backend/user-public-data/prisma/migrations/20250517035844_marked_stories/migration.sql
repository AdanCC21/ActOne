-- AlterTable
ALTER TABLE "UserPublicData" ADD COLUMN     "marked_stories" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
