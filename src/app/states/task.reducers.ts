import { createReducer, on } from '@ngrx/store';
import { addTask, editTask, deleteTask, loadTasksSuccess } from './task.actions';
import { Task } from './Task.model';

export interface TaskState {
  tasks: Task[];
}

export const initialState: TaskState = {
  tasks: [],
};

export const taskReducer = createReducer(
  initialState,
  on(addTask, (state, { task }) => ({
    ...state,
    tasks: [task,...state.tasks ],
  })),
  on(editTask, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map(t => (t.id === task.id ? task : t)),
  })),
  on(deleteTask, (state, { id }) => ({
    ...state,
    tasks: state.tasks.filter(t => t.id !== id),
  })),
  on(loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks: [...tasks],
  }))
);
