import { Component, DestroyRef, OnInit, inject, input } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports:[RouterOutlet],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit {
  userId = input.required<string>();
  userName = '';
  private usersService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const subscription = this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        this.userName =
          this.usersService.users.find((u) => u.id === paramMap.get('userId'))
            ?.name || '';
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
