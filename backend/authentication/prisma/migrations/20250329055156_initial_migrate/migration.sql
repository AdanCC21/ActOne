-- CreateTable
CREATE TABLE "Authentication" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "type_authentication" TEXT NOT NULL,
    "authentication" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "create_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hidden" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Authentication_pkey" PRIMARY KEY ("id")
);
