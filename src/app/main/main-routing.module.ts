import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from '../add-user/add-user.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { LoginComponent } from '../login/login.component';
import { SidepageComponent } from '../sidepage/sidepage.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: 'login', component: LoginComponent },
      // { path: 'forogt-password', component: ForgotPasswordComponent },
      { path: 'sidepage', component: SidepageComponent },
      { path: 'add-user', component: AddUserComponent },
      { path: '', redirectTo: '/main/login', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
