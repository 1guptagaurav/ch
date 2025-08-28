// src/app/models/course.model.ts

// This interface defines the structure for a Course object.
// Using interfaces helps ensure type safety throughout your application.
export interface Course {
  thumbnailUrl: string;
  title: string;
  provider: {
    logoUrl: string;
  };
  rating: number;
  reviewCount: number;
  enrollmentCount: number;
  difficulty: string;
  durationText: string;
  lastVisited: string; // ISO string format for dates is recommended
  publishedDate: string; // ISO string format
}
