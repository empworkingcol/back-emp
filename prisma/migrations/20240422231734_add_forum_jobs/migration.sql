-- CreateTable
CREATE TABLE "job_offers" (
    "job_offer_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "offer_text" TEXT NOT NULL,
    "offer_title" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "creation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "job_offers_pkey" PRIMARY KEY ("job_offer_id")
);

-- CreateTable
CREATE TABLE "forum_questions" (
    "question_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "question_text" TEXT NOT NULL,
    "question_title" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "creation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "forum_questions_pkey" PRIMARY KEY ("question_id")
);

-- CreateTable
CREATE TABLE "forum_responses" (
    "response_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "response_text" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "creation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "forum_responses_pkey" PRIMARY KEY ("response_id")
);

-- AddForeignKey
ALTER TABLE "job_offers" ADD CONSTRAINT "job_offers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forum_questions" ADD CONSTRAINT "forum_questions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forum_responses" ADD CONSTRAINT "forum_responses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
