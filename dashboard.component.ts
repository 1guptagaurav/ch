import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tasks: any[] = [];
  filteredTasks: any[] = [];

  // Active filter selections
  selectedStatus: string = 'all';
  selectedPriority: string = 'all';

  ngOnInit() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
      this.applyFilters();
    }
  }

  applyFilters() {
    this.filteredTasks = this.tasks.filter(task => {
      const statusMatch = this.selectedStatus === 'all' || task.status === this.selectedStatus;
      const priorityMatch = this.selectedPriority === 'all' || task.priority === this.selectedPriority;
      return statusMatch && priorityMatch;
    });
  }

  onStatusChange(newStatus: string) {
    this.selectedStatus = newStatus;
    this.applyFilters();
  }

  onPriorityChange(newPriority: string) {
    this.selectedPriority = newPriority;
    this.applyFilters();
  }
}
