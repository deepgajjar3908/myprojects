import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { authguard } from './authguard.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SidepageComponent } from './sidepage/sidepage.component';
import { UsersModule } from "./users/users.module";

const routes: Routes = [
  { path: 'main',  loadChildren: () => import('./main/main.module').then((m) => m.MainModule) },
  { path: '', redirectTo: '/main/login', pathMatch: 'full' },
  { path: 'forogt-password', component: ForgotPasswordComponent },
  { path: 'users',  loadChildren: () => import('./users/users.module').then((m) => m.UsersModule), canActivate:[authguard]},
  { path: '**', component: NotFoundComponent },
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
