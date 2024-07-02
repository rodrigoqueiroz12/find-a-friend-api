/*
  Warnings:

  - You are about to alter the column `street` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `city` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.
  - You are about to alter the column `name` on the `organizations` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `name` on the `pets` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `age` on the `pets` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(25)`.
  - You are about to alter the column `energy` on the `pets` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(25)`.
  - You are about to alter the column `ambient` on the `pets` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(25)`.
  - You are about to alter the column `size` on the `pets` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(25)`.
  - You are about to alter the column `dependency` on the `pets` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(25)`.
  - You are about to alter the column `name` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `email` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(254)`.
  - You are about to alter the column `password` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(64)`.

*/
-- AlterTable
ALTER TABLE "addresses" ALTER COLUMN "zip_code" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "street" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "city" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "organizations" ALTER COLUMN "name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "contact" SET DATA TYPE VARCHAR(15);

-- AlterTable
ALTER TABLE "pets" ALTER COLUMN "name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "age" SET DATA TYPE VARCHAR(25),
ALTER COLUMN "energy" SET DATA TYPE VARCHAR(25),
ALTER COLUMN "ambient" SET DATA TYPE VARCHAR(25),
ALTER COLUMN "size" SET DATA TYPE VARCHAR(25),
ALTER COLUMN "dependency" SET DATA TYPE VARCHAR(25);

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(254),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(64);
