import { createAction, props } from '@ngrx/store';
import { Task } from './Task.model';

export interface TaskState {
  tasks: Task[];
}

export const initialState: TaskState = {
  tasks: []
};
