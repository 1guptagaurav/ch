// src/app/shared/blog-card/blog-card.component.ts

import { Component, Input } from '@angular/core';
import { Blog } from '../../models/blog.model';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss']
})
export class BlogCardComponent {
  @Input() blog!: Blog;
}
