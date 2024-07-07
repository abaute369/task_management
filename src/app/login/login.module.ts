import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  //{path:'', redirectTo:'login', pathMatch:'full'},
  {path:'', component:LoginComponent}
]

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    RouterModule
  ],
 exports:[
  LoginComponent
 ]
})
export class LoginModule { }
