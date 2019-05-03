export interface ReviewDetails {
    _id: string;
    reviewId: string;
    rating;
    reviewDate;
    reviewBody: string;
    bookId: string;
    userId: string;
    userName: string;
    LikesCount;
}
