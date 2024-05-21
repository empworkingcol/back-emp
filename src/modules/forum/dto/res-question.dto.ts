export class ResForumQuestionDto {
  question_id: string;
  question_text: string;
  question_title: string;
  user: {
    user_name: string;
  };
  ForumResponse: {
    response_text: string;
    creation_date: Date;
    user: {
      user_name: string;
    };
  }[];
  creation_date: Date;
}
