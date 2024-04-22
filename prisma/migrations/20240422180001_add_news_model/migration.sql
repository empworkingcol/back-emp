-- CreateTable
CREATE TABLE "news" (
    "new_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "new_title" TEXT NOT NULL,
    "new_text" TEXT NOT NULL,
    "img_url" TEXT NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "creation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "news_pkey" PRIMARY KEY ("new_id")
);

-- CreateTable
CREATE TABLE "likes_news" (
    "like_id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "new_id" TEXT NOT NULL,

    CONSTRAINT "likes_news_pkey" PRIMARY KEY ("like_id")
);

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes_news" ADD CONSTRAINT "likes_news_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes_news" ADD CONSTRAINT "likes_news_new_id_fkey" FOREIGN KEY ("new_id") REFERENCES "news"("new_id") ON DELETE RESTRICT ON UPDATE CASCADE;
