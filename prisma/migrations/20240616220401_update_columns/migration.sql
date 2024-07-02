/*
  Warnings:

  - You are about to alter the column `neighborhood` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE "addresses" ALTER COLUMN "neighborhood" SET DATA TYPE VARCHAR(50);
