export class ResJobOfferDto {
  job_offer_id: string;
  user: {
    user_name: string;
  };
  city: {
    city_name: string;
    country: {
      country_name: string;
    };
  };
  offer_title: string;
  creation_date: Date;
  offer_text: string;
}
