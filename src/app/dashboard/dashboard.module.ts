import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskFormComponent } from './task-form/task-form.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule} from '@angular/material/sort';
import { MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
const routes: Routes = [
  { path: '', component: DashboardComponent, },
  { path: 'create-task', component: TaskFormComponent, title:'create-task' },
  { path: 'edit-task', component: TaskFormComponent, title:'edit-task'}
]


@NgModule({
  declarations: [DashboardComponent, HeaderComponent, FooterComponent, TaskFormComponent, EditFormComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
