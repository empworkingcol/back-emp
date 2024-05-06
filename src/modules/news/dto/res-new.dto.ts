export class ResNewDto {
  new_id: string;
  new_title: string;
  new_text: string;
  img_url: string;
  NewComment: {
    comment_text: string;
    creation_date: Date;
    user: {
      user_name: string;
    };
  }[];
  user: {
    user_name: string;
  };
  creation_date: Date;
}
