export class ResCourseDto {
  course_name: string;

  course_description: string;

  CategoryCourse: {
    category_name: string;
  };

  course_type: string;

  course_date: Date;

  total_steps: number;

  img_url: string;

  Video: {
    video_url: string;
    position: number;
  }[];

  Test: {
    option_1: string;
    option_2: string;
    option_3: string;
    option_4: string;
    question: string;
    position: number;
    correct_answer: string;
  }[];
}
