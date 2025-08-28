// src/app/services/blog.service.ts

import { Injectable, signal } from '@angular/core';
import { Blog } from '../models/blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  blogList = signal<Blog[]>([]);

  constructor() {
    this.ngOnInit();
  }

  ngOnInit(): void {
    const stored = localStorage.getItem('blogs');
    if (stored) {
      this.blogList.set(JSON.parse(stored));
    }
  }

  // Adds a blog to the list, avoiding duplicates.
  addBlog(blog: Blog) {
    const current = this.blogList();
    if (!current.find(b => b.title === blog.title)) {
      const updated = [...current, blog];
      this.blogList.set(updated);
      // BUG FIX: Saving to the correct 'blogs' key in localStorage.
      localStorage.setItem('blogs', JSON.stringify(updated));
    }
  }

  // Returns the current list of blogs.
  getBlogs(): Blog[] {
    return this.blogList();
  }
}
