/*
  Warnings:

  - You are about to alter the column `about` on the `pets` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(300)`.

*/
-- AlterTable
ALTER TABLE "pets" ALTER COLUMN "about" SET DATA TYPE VARCHAR(300);
