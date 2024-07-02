/*
  Warnings:

  - You are about to drop the column `organization_id` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `organization_id` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the `organizations` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `addresses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'user');

-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "organizations" DROP CONSTRAINT "organizations_user_id_fkey";

-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_organization_id_fkey";

-- DropIndex
DROP INDEX "addresses_organization_id_key";

-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "organization_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "organization_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "contact" VARCHAR(15) NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'user';

-- DropTable
DROP TABLE "organizations";

-- CreateIndex
CREATE UNIQUE INDEX "addresses_user_id_key" ON "addresses"("user_id");

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
