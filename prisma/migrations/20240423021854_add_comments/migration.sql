-- CreateTable
CREATE TABLE "new_comments" (
    "comment_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "new_id" TEXT NOT NULL,
    "comment_text" TEXT NOT NULL,

    CONSTRAINT "new_comments_pkey" PRIMARY KEY ("comment_id")
);

-- AddForeignKey
ALTER TABLE "new_comments" ADD CONSTRAINT "new_comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "new_comments" ADD CONSTRAINT "new_comments_new_id_fkey" FOREIGN KEY ("new_id") REFERENCES "news"("new_id") ON DELETE RESTRICT ON UPDATE CASCADE;
