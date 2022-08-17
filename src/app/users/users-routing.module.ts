import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomDirectiveComponent } from './custom-directive/custom-directive.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { EmployeeComponent } from './employee/employee.component';
import { HomeComponent } from './home/home.component';
import { OtpComponent } from './otp/otp.component';
import { ProjectComponent } from './project/project.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UsdComponent } from './usd/usd.component';

const routes: Routes = [
  {
    path: '', component: DashbordComponent, children: [
      { path: 'home', component: HomeComponent },
      { path: 'project', component: ProjectComponent },
      { path: 'employee', component: EmployeeComponent },
      { path: 'otp', component: OtpComponent },
      { path: 'usd', component: UsdComponent },
      { path: 'customdirective', component: CustomDirectiveComponent },
      { path: '', redirectTo: '/users/home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
