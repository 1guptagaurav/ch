// src/app/dashboard/dashboard.component.ts

import { Component, OnInit, signal, effect, HostListener } from '@angular/core';
import { ViewedCoursesService } from '../services/viewed-courses.service';
import { BlogService } from '../services/blog.service';
import { Course } from '../models/course.model';
import { Blog } from '../models/blog.model';
import { Carousel } from '../models/carousel';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // These are the properties the HTML template will bind to.
  // The '!' tells TypeScript they will be initialized later.
  lastViewedCarousel!: Carousel;
  newlyUpdatedCarousel!: Carousel;
  blogCarousel!: Carousel;

  // Signals to hold the raw data from your services.
  sortedCoursesList = signal<Course[]>([]);
  latestCoursesList = signal<Course[]>([]);
  blogList = signal<Blog[]>([]);

  constructor(
    private viewedCoursesService: ViewedCoursesService,
    private blogService: BlogService
  ) {
    // Use 'effect' to automatically create/update the carousels
    // whenever the underlying data signals change.
    effect(() => {
      this.lastViewedCarousel = new Carousel(this.sortedCoursesList(), 17, 1);
    });

    effect(() => {
      this.newlyUpdatedCarousel = new Carousel(this.latestCoursesList(), 17, 1);
    });

    effect(() => {
      this.blogCarousel = new Carousel(this.blogList(), 17, 1);
    });
  }

  // Listen for the window resize event to make the carousels responsive.
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.lastViewedCarousel?.updateCardsPerView();
    this.newlyUpdatedCarousel?.updateCardsPerView();
    this.blogCarousel?.updateCardsPerView();
  }

  ngOnInit(): void {
    // Fetch and sort the data when the component initializes.
    this.getViewedCourses();
    this.getNewlyLaunchedCourses();
    this.getBlogs();
  }

  getViewedCourses() {
    const courses = this.viewedCoursesService.getCourses();
    // Sort by the most recently visited.
    const sorted = [...courses].sort((a, b) => new Date(b.lastVisited).getTime() - new Date(a.lastVisited).getTime());
    this.sortedCoursesList.set(sorted);
  }

  getNewlyLaunchedCourses() {
    const courses = this.viewedCoursesService.getNewlyLaunched();
    // Sort by the most recently published.
    const sorted = [...courses].sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
    this.latestCoursesList.set(sorted);
  }

  getBlogs() {
    const blogs = this.blogService.getBlogs();
    this.blogList.set(blogs);
  }
}
