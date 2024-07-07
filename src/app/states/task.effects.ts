import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { addTask, deleteTask, editTask, loadTasks, loadTasksSuccess } from './task.actions';
import { Task } from './Task.model';

@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions, private store: Store) {}

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTasks),
      mergeMap(() => {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        return of(loadTasksSuccess({ tasks }));
      })
    )
  );

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTask),
      tap(({ task }) => {
        const tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.unshift(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
      })
    ), { dispatch: false }
  );

  editTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editTask),
      tap(({ task }) => {
        const tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
        const index = tasks.findIndex(t => t.id === task.id);
        if (index >= 0) {
          tasks[index] = task;
          localStorage.setItem('tasks', JSON.stringify(tasks));
        }
      })
    ), { dispatch: false }
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTask),
      tap(({ id }) => {
        let tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = tasks.filter(t => t.id !== id);
        localStorage.setItem('tasks', JSON.stringify(tasks));
      })
    ), { dispatch: false }
  );
}
