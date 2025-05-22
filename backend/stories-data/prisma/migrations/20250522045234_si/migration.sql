-- AlterTable
ALTER TABLE "StorieData" ADD COLUMN     "duration" TEXT NOT NULL DEFAULT 'Short',
ADD COLUMN     "labels" TEXT[] DEFAULT ARRAY[]::TEXT[];
