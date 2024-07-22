import { Component, computed, inject, input } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent],
})
export class TasksComponent {
  //userTasks: Task[] = [];
  userId = input.required<string>();

  private taskService = inject(TasksService);
  userTasks = computed(() =>
    this.taskService.allTasks().filter((task) => task.userId === this.userId())
  );
}


