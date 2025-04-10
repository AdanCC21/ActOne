-- CreateTable
CREATE TABLE "StorieData" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "Acts" INTEGER NOT NULL,
    "likes_count" INTEGER NOT NULL,
    "comments" INTEGER NOT NULL,
    "reports" INTEGER NOT NULL,
    "visibility" BOOLEAN NOT NULL,
    "creation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mody_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StorieData_pkey" PRIMARY KEY ("id")
);
