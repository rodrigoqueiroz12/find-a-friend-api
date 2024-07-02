-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "organizations" DROP CONSTRAINT "organizations_user_id_fkey";

-- DropForeignKey
ALTER TABLE "pet_pictures" DROP CONSTRAINT "pet_pictures_pet_id_fkey";

-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_organization_id_fkey";

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pet_pictures" ADD CONSTRAINT "pet_pictures_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
