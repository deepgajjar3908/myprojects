import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ProjectComponent } from './project/project.component';
import { EmployeeComponent } from './employee/employee.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule, MatNavList} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { OtpComponent } from './otp/otp.component';
import { CustomStyleDirective } from './custom-style.directive';
import { CustomDirectiveComponent } from './custom-directive/custom-directive.component';
import { UsdinrPipe } from './usdinr.pipe';
import { UsdComponent } from './usd/usd.component';
import { SearchComponent } from './search/search.component';
@NgModule({
  declarations: [
    DashbordComponent,
    ProjectComponent,
    EmployeeComponent,
    HomeComponent,
    SidebarComponent,
    OtpComponent,
    CustomStyleDirective,
    CustomDirectiveComponent,
    UsdinrPipe,
    UsdComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule
  ]
})
export class UsersModule { }
