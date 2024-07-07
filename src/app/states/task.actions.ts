import { createAction, props } from '@ngrx/store';
import { Task } from './Task.model';

export const addTask = createAction(
  '[Task] Add Task',
  props<{ task: Task }>()
);

export const editTask = createAction(
  '[Task] Edit Task',
  props<{ task: Task }>()
);

export const deleteTask = createAction(
  '[Task] Delete Task',
  props<{ id: string }>()
);

export const loadTasks = createAction('[Task] Load Tasks');
export const loadTasksSuccess = createAction(
  '[Task] Load Tasks Success',
  props<{ tasks: Task[] }>()
);
