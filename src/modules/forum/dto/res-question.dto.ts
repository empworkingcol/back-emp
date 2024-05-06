export class ResForumQuestionDto {
  question_id: string;
  question_text: string;
  question_title: string;
  user: {
    user_name: string;
  };
  ForumResponse: {
    response_text: string;
    user: {
      user_name: string;
    };
  }[];
  creation_date: Date;
}
