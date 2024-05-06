/*
  Warnings:

  - You are about to drop the column `user_id` on the `collaborators` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `companies` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[collaborator_id]` on the table `collaborators` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[company_id]` on the table `companies` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `collaborator_id` to the `collaborators` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_id` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city_id` to the `job_offers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "collaborators" DROP CONSTRAINT "collaborators_user_id_fkey";

-- DropForeignKey
ALTER TABLE "companies" DROP CONSTRAINT "companies_user_id_fkey";

-- DropIndex
DROP INDEX "collaborators_user_id_key";

-- DropIndex
DROP INDEX "companies_user_id_key";

-- AlterTable
ALTER TABLE "collaborators" DROP COLUMN "user_id",
ADD COLUMN     "collaborator_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "companies" DROP COLUMN "user_id",
ADD COLUMN     "company_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "job_offers" ADD COLUMN     "city_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "collaborators_collaborator_id_key" ON "collaborators"("collaborator_id");

-- CreateIndex
CREATE UNIQUE INDEX "companies_company_id_key" ON "companies"("company_id");

-- AddForeignKey
ALTER TABLE "collaborators" ADD CONSTRAINT "collaborators_collaborator_id_fkey" FOREIGN KEY ("collaborator_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_offers" ADD CONSTRAINT "job_offers_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("city_id") ON DELETE RESTRICT ON UPDATE CASCADE;
