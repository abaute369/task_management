export interface Task {
  id: string;
  taskname: string;
  taskDate: Date;
  achievedDate: Date;
  tags: string[];
  priority: string;
}
