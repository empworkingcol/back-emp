/*
  Warnings:

  - Added the required column `updated_date` to the `new_comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "new_comments" ADD COLUMN     "creation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updated_date" TIMESTAMP(3) NOT NULL;
