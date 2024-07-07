import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../states/Task.model';
import { Store } from '@ngrx/store';
import { addTask, deleteTask, editTask, loadTasks } from '../states/task.actions';
import { selectAllTasks } from '../states/task.selector';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  displayedColumns: string[] = ['id', 'taskname', 'priority', 'taskDate', 'achievedDate', 'actions'];
  dataSource: MatTableDataSource<Task> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  searchValue: String = '';
  currentUser: any;
  tasks$: Observable<Task[]>;
  itemToEdit: Task;


  constructor(private store: Store) {
    this.tasks$ = this.store.select(selectAllTasks);
    this.tasks$.subscribe(tasks => {
      this.dataSource.data = tasks;
    })
  }


  onAddTask(task: Task) {
    this.store.dispatch(addTask({ task }));
  }

  onEditTask(task: Task) {
    this.store.dispatch(editTask({ task }));
  }

  onDeleteTask(id: string) {
    this.store.dispatch(deleteTask({ id }));
  }

  ngOnInit(): void {
    this.store.dispatch(loadTasks());
    this.currentUser = JSON.parse(localStorage.getItem('curentUser'))
    console.log(this.currentUser)
  }

  deleteTask(task: Task) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.onDeleteTask(task.id)
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }
   
  showAlert() {
    Swal.fire({
      title: 'Hello World!',
      text: 'This is a SweetAlert2 alert',
      icon: 'success',
      confirmButtonText: 'Cool'
    });
  }
}
