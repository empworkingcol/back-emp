export class ResCourseDto {
  course_name: string;

  course_description: string;

  category_course: {
    category_name: string;
  };

  course_type: string;

  course_date: Date;

  total_steps: number;

  img_url: string;

  video: {
    video_url: string;
    position: number;
  }[];

  test: {
    option_1: string;
    option_2: string;
    option_3: string;
    option_4: string;
    question: string;
    position: number;
    correct_answer: string;
  }[];
}
