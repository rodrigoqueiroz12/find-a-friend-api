/*
  Warnings:

  - You are about to drop the column `dependency` on the `pets` table. All the data in the column will be lost.
  - Added the required column `independency` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "dependency",
ADD COLUMN     "independency" VARCHAR(25) NOT NULL;
