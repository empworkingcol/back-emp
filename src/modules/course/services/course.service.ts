import { Injectable, Logger } from '@nestjs/common';
import { Prisma, Course } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { CourseDto } from '../dto/course.dto';
import { CourseVideoDto } from '../dto/video.dto';
import { TestDto } from '../dto/test.dto';
import { ResCourseDto } from '../dto/res-course.dto';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  private logger = new Logger('Course service');

  async getCourse(
    courseWhereUniqueInput: Prisma.CourseWhereUniqueInput,
  ): Promise<ResCourseDto | null> {
    this.logger.log('courseById');
    const course = await this.prisma.course.findUnique({
      where: courseWhereUniqueInput,
      select: {
        course_name: true,
        course_description: true,
        img_url: true,
        course_date: true,
        total_steps: true,
        course_type: true,
        CategoryCourse: {
          select: {
            category_name: true,
          },
        },
        Video: {
          select: {
            video_url: true,
            position: true,
          },
        },
        Test: {
          select: {
            option_1: true,
            option_2: true,
            option_3: true,
            option_4: true,
            question: true,
            position: true,
            correct_answer: true,
          },
        },
      },
    });
    return course;
  }

  async getAllCourses() {
    this.logger.log('getAllCourses');
    const data = await this.prisma.course.findMany({
      select: {
        course_id: true,
        course_name: true,
        course_description: true,
        img_url: true,
        course_date: true,
        CategoryCourse: {
          select: {
            category_name: true,
          },
        },
      },
    });

    return {
      data,
    };
  }

  async createCourse(data: CourseDto): Promise<Course> {
    this.logger.log('createCourse');
    const course = await this.prisma.course.create({
      data: {
        course_name: data.course_name,
        course_description: data.course_description,
        img_url: data.img_url,
        total_steps: data.total_steps,
        course_type: data.course_type,
        course_date: data.course_date,
        CategoryCourse: { connect: { category_id: data.category_id } },
      },
    });

    data.videos.map(async (video: CourseVideoDto) => {
      await this.prisma.video.create({
        data: {
          video_url: video.video_url,
          position: video.position,
          course: { connect: { course_id: course.course_id } },
        },
      });
    });

    data.tests.map(async (test: TestDto) => {
      await this.prisma.test.create({
        data: {
          question: test.question,
          option_1: test.option_1,
          option_2: test.option_2,
          option_3: test.option_3,
          option_4: test.option_4,
          correct_answer: test.correct_answer,
          position: test.position,
          course: { connect: { course_id: course.course_id } },
        },
      });
    });

    return course;
  }

  async enrollUser(data): Promise<string> {
    const enroll = await this.prisma.coursesUsers.create({
      data: {
        Course: { connect: { course_id: data.course_id } },
        CourseStatus: { connect: { status_id: 1 } },
        User: { connect: { user_id: data.user_id } },
        step: 1,
      },
    });
    return enroll.course_id;
  }

  async updateCourse(params: {
    where: Prisma.CourseWhereUniqueInput;
    data: Prisma.CourseUpdateInput;
  }): Promise<Course> {
    this.logger.log('updateCourse');
    const updateCourse = await this.prisma.course.update({
      where: params.where,
      data: params.data,
    });
    return updateCourse;
  }
}
