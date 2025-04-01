/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Authentication` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Authentication` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Authentication_user_id_key" ON "Authentication"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Authentication_email_key" ON "Authentication"("email");
