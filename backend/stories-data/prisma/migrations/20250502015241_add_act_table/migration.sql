-- CreateTable
CREATE TABLE "ActData" (
    "id" SERIAL NOT NULL,
    "act_number" INTEGER NOT NULL DEFAULT 0,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "ActData_pkey" PRIMARY KEY ("id")
);
