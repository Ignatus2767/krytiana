export interface Review {
  username: string;
  productId: string;
  rating: number;
  comment: string;
  date: Date;
}

const reviews: Review[] = [];


export const addReview = (review: Review) => {
  reviews.push(review);
};

export const getReviews = () => {
  return reviews;
};
