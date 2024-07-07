import { LoginModule } from './login/login.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authguardGuard } from './AuthGaurd/authguard.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule), title:'Login' },
  { path: 'register', loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule), title:'Registration' },
  { path: 'dashbaord', canActivate:[authguardGuard], loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), title:'Dashboard'},
  {path:'**', component:PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
