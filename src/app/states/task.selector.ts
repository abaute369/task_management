import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './task.reducers';

export const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const selectAllTasks = createSelector(
  selectTaskState,
  (state: TaskState) => state.tasks
);
