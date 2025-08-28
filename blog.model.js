export interface Blog {
  authorId: string;
  thumbnailUrl: string;
  title: string;
  rating: number;
  reviewCount: number;
  publishedDate: string; // ISO string format
  author: {
      name: string;
      avatarUrl: string;
  };
}
