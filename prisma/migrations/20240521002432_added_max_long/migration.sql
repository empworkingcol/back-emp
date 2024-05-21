/*
  Warnings:

  - You are about to alter the column `question_text` on the `forum_questions` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(2040)`.
  - You are about to alter the column `response_text` on the `forum_responses` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(2040)`.
  - You are about to alter the column `offer_text` on the `job_offers` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(2040)`.
  - You are about to alter the column `comment_text` on the `new_comments` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(2040)`.
  - You are about to alter the column `new_text` on the `news` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(2040)`.

*/
-- AlterTable
ALTER TABLE "forum_questions" ALTER COLUMN "question_text" SET DATA TYPE VARCHAR(2040);

-- AlterTable
ALTER TABLE "forum_responses" ALTER COLUMN "response_text" SET DATA TYPE VARCHAR(2040);

-- AlterTable
ALTER TABLE "job_offers" ALTER COLUMN "offer_text" SET DATA TYPE VARCHAR(2040);

-- AlterTable
ALTER TABLE "new_comments" ALTER COLUMN "comment_text" SET DATA TYPE VARCHAR(2040);

-- AlterTable
ALTER TABLE "news" ALTER COLUMN "new_text" SET DATA TYPE VARCHAR(2040);
