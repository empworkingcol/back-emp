-- CreateEnum
CREATE TYPE "CourseType" AS ENUM ('ONSITE', 'ONLINE');

-- CreateTable
CREATE TABLE "course_categories" (
    "category_id" SERIAL NOT NULL,
    "category_name" TEXT NOT NULL,

    CONSTRAINT "course_categories_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "course_status" (
    "status_id" SERIAL NOT NULL,
    "status_name" TEXT NOT NULL,

    CONSTRAINT "course_status_pkey" PRIMARY KEY ("status_id")
);

-- CreateTable
CREATE TABLE "courses" (
    "course_id" TEXT NOT NULL,
    "course_name" TEXT NOT NULL,
    "course_description" TEXT NOT NULL,
    "img_url" TEXT NOT NULL,
    "total_steps" INTEGER NOT NULL,
    "course_type" "CourseType" NOT NULL,
    "course_date" TIMESTAMP(3) NOT NULL,
    "category_id" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "creation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("course_id")
);

-- CreateTable
CREATE TABLE "videos" (
    "video_id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "video_url" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("video_id")
);

-- CreateTable
CREATE TABLE "tests" (
    "test_id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "option_1" TEXT NOT NULL,
    "option_2" TEXT NOT NULL,
    "option_3" TEXT NOT NULL,
    "option_4" TEXT NOT NULL,
    "correct_answer" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "creation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tests_pkey" PRIMARY KEY ("test_id")
);

-- CreateTable
CREATE TABLE "courses_users" (
    "course_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "status_id" INTEGER NOT NULL,
    "step" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "courses_users_user_id_course_id_status_id_key" ON "courses_users"("user_id", "course_id", "status_id");

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "course_categories"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "videos" ADD CONSTRAINT "videos_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses_users" ADD CONSTRAINT "courses_users_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses_users" ADD CONSTRAINT "courses_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses_users" ADD CONSTRAINT "courses_users_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "course_status"("status_id") ON DELETE RESTRICT ON UPDATE CASCADE;
