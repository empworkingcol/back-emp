/*
  Warnings:

  - Added the required column `question_id` to the `forum_responses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "forum_responses" ADD COLUMN     "question_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "likes_news" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AddForeignKey
ALTER TABLE "forum_responses" ADD CONSTRAINT "forum_responses_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "forum_questions"("question_id") ON DELETE RESTRICT ON UPDATE CASCADE;
