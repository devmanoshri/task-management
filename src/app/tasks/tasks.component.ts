import {
  Component,
  OnInit,
  computed,
  inject,
  input,
  DestroyRef,
  signal,
} from '@angular/core';

import { ActivatedRoute, RouterLink } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit {
  //userTasks: Task[] = [];
  userId = input.required<string>();

  order = signal<'asc' | 'desc'>('asc');

  private taskService = inject(TasksService);
  userTasks = computed(() =>
    this.taskService
      .allTasks()
      .filter((task) => task.userId === this.userId())
      .sort((a, b) => {
        if (this.order() === 'desc') {
          return a.id > b.id ? -1 : 1;
        } else {
          return a.id > b.id ? 1 : -1;
        }
      })
  );

  //order = input<'asc' | 'desc'>();

  // order?: 'asc' | 'desc';
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const subs = this.activatedRoute.queryParams.subscribe({
      // next: (params) => (this.order = params['order']),
      next: (params) => this.order.set(params['order']),
    });

    this.destroyRef.onDestroy(() => subs.unsubscribe());
  }
}
