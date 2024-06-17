import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { SidenavComponent } from '../common/nav/sidenav/sidenav.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthLayoutComponent } from '../common/auth/auth-layout/auth-layout.component';
import { AuthComponent } from '../common/auth/auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptorService } from '../common/auth/auth-interceptor.service';
import { AddEmployeeComponent } from '../administration-panel/components/trainings/add-employee/add-employee.component';
import { AddEmployeeTrainingComponent } from '../administration-panel/components/trainings/add-employee-training/add-employee-training.component';
import { AddTrainingComponent } from '../administration-panel/components/trainings/add-training/add-training.component';
import { EmployeeTrainingsComponent } from '../administration-panel/components/trainings/employee-trainings/employee-trainings.component';
import { EmployeesComponent } from '../administration-panel/components/trainings/employees/employees.component';
import { TrainingsComponent } from '../administration-panel/components/trainings/trainings/trainings.component';
import { AddUserDialogComponent } from '../administration-panel/components/user/add-user-dialog/add-user-dialog.component';
import { UserInfoDialogComponent } from '../common/auth/user-info-dialog/user-info-dialog.component';
import { UserListComponent } from '../administration-panel/components/user/user-list/user-list.component';
import { ListOfPersonsChartOrganizationComponent } from '../administration-panel/components/chart-organization/add-chart-organization/list-of-persons-chart-organization.component';
import { AddChartOrganizationDialogComponent } from '../administration-panel/components/chart-organization/add-chart-organization/add-chart-organization-dialog/add-chart-organization-dialog.component';
import { ChartOrganizationComponent } from '../administration-panel/components/chart-organization/chart-organization/chart-organization.component';
import { DisplayCharOrgComponent } from '../users-panel/display-char-org/display-char-org.component';
import { AddCompanyComponent } from '../administration-panel/components/company/add-company/add-company.component';
import { CompaniesListComponent } from '../administration-panel/components/company/companies-list/companies-list.component';
import { AddQualityPolicyComponent } from '../administration-panel/components/quality-policy/add-quality-policy/add-quality-policy.component';
import { ChooseQualityPolicyComponent } from '../administration-panel/components/quality-policy/choose-quality-policy/choose-quality-policy.component';
import { QualityPolicyListComponent } from '../administration-panel/components/quality-policy/quality-policy-list/quality-policy-list.component';
import { AddRegulationComponent } from '../administration-panel/components/regulations/add-regulation/add-regulation.component';
import { RegulationsListComponent } from '../administration-panel/components/regulations/regulations-list/regulations-list.component';
import { AddBaseProcessComponent } from '../administration-panel/components/process/add-base-process/add-base-process.component';
import { AddProcessComponent } from '../administration-panel/components/process/add-process/add-process.component';
import { BaseProcessesComponent } from '../administration-panel/components/process/base-processes/base-processes.component';
import { DefineBaseProcessComponent } from '../administration-panel/components/process/define-base-process/define-base-process.component';
import { DefineProcessComponent } from '../administration-panel/components/process/define-process/define-process.component';
import { DefineProcessDialogComponent } from '../administration-panel/components/process/define-process-dialog/define-process-dialog.component';
import { ProcessToDisplayComponent } from '../administration-panel/components/process/process-to-display/process-to-display.component';
import { ProcessesComponent } from '../administration-panel/components/process/processes/processes.component';
import { ChangePasswordDialogComponent } from '../common/auth/change-password-dialog/change-password-dialog.component';
import { DisplayQualityPoliciesComponent } from '../users-panel/display-quality-policies/display-quality-policies.component';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from '../common/components/confirmation-dialog/confirmation-dialog.component';
import { DisplayEmployeeTrainingsComponent } from '../administration-panel/components/trainings/display-employee-trainings/display-employee-trainings.component';
import { SubProcessesComponent } from '../administration-panel/components/sub-proc/sub-processes/sub-processes.component';
import { AddSubProcessComponent } from '../administration-panel/components/sub-proc/add-sub-process/add-sub-process.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AddOrganizationalContextComponent } from '../administration-panel/components/organizational-context/add-organizational-context/add-organizational-context.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddDeviceComponent } from '../administration-panel/components/devices/add-device/add-device.component';
import { DevicesComponent } from '../administration-panel/components/devices/devices/devices.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    AuthLayoutComponent,
    AuthComponent,
    AddEmployeeComponent,
    AddEmployeeTrainingComponent,
    AddTrainingComponent,
    EmployeeTrainingsComponent,
    EmployeesComponent,
    TrainingsComponent,
    AddUserDialogComponent,
    UserInfoDialogComponent,
    UserListComponent,
    ListOfPersonsChartOrganizationComponent,
    AddChartOrganizationDialogComponent,
    ChartOrganizationComponent,
    DisplayCharOrgComponent,
    AddCompanyComponent,
    CompaniesListComponent,
    AddQualityPolicyComponent,
    ChooseQualityPolicyComponent,
    QualityPolicyListComponent,
    AddRegulationComponent,
    RegulationsListComponent,
    AddBaseProcessComponent,
    AddProcessComponent,
    BaseProcessesComponent,
    DefineBaseProcessComponent,
    DefineProcessComponent,
    DefineProcessDialogComponent,
    ProcessToDisplayComponent,
    ProcessesComponent,
    ChangePasswordDialogComponent,
    DisplayQualityPoliciesComponent,
    ConfirmationDialogComponent,
    DisplayEmployeeTrainingsComponent,
    SubProcessesComponent,
    AddSubProcessComponent,
    AddOrganizationalContextComponent,
    AddDeviceComponent,
    DevicesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    OrganizationChartModule,
    CommonModule,
    AngularEditorModule,
    FlexLayoutModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
