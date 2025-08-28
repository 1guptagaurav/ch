// src/app/shared/course-card/course-card.component.ts

import { Component, Input } from '@angular/core';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  // The '@Input' decorator allows the parent component (dashboard)
  // to pass course data into this component.
  @Input() course!: Course;
}
