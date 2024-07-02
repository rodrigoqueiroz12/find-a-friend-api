/*
  Warnings:

  - A unique constraint covering the columns `[organization_id]` on the table `addresses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "addresses_organization_id_key" ON "addresses"("organization_id");
