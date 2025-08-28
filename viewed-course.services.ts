// src/app/services/viewed-courses.service.ts

import { Injectable, signal } from '@angular/core';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class ViewedCoursesService {
  // Use a signal to hold the list of courses for reactive updates.
  viewedCoursesList = signal<Course[]>([]);

  constructor() {
    // Load data from localStorage when the service is first created.
    this.ngOnInit();
  }

  ngOnInit(): void {
    const stored = localStorage.getItem('viewedCourses');
    if (stored) {
      this.viewedCoursesList.set(JSON.parse(stored));
    } else {
        // If nothing is stored, you might want to load some mock data here.
    }
  }

  // Adds a course to the list, avoiding duplicates.
  addCourse(course: Course) {
    const current = this.viewedCoursesList();
    // Check if the course already exists by title.
    if (!current.find(c => c.title === course.title)) {
      const updated = [...current, course];
      this.viewedCoursesList.set(updated);
      localStorage.setItem('viewedCourses', JSON.stringify(updated));
    }
  }

  // Returns the current list of courses.
  getCourses(): Course[] {
    return this.viewedCoursesList();
  }

  // You would expand this to return newly launched courses, perhaps from an API call.
  getNewlyLaunched(): Course[] {
    // For now, we can just return the same list for demonstration.
    return this.viewedCoursesList();
  }
}
