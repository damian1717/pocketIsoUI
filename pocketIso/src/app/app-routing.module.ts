import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from '../common/nav/sidenav/sidenav.component';
import { AppComponent } from './app.component';
import { AuthGuard } from '../common/auth/auth.guards';
import { AuthLayoutComponent } from '../common/auth/auth-layout/auth-layout.component';
import { AuthComponent } from '../common/auth/auth/auth.component';
import { Role } from '../common/enums/user-role-codes';
import { DisplayEmployeeTrainingsComponent } from '../administration-panel/components/trainings/display-employee-trainings/display-employee-trainings.component';
import { TrainingsComponent } from '../administration-panel/components/trainings/trainings/trainings.component';
import { AddTrainingComponent } from '../administration-panel/components/trainings/add-training/add-training.component';
import { EmployeesComponent } from '../administration-panel/components/trainings/employees/employees.component';
import { AddEmployeeComponent } from '../administration-panel/components/trainings/add-employee/add-employee.component';
import { EmployeeTrainingsComponent } from '../administration-panel/components/trainings/employee-trainings/employee-trainings.component';
import { AddEmployeeTrainingComponent } from '../administration-panel/components/trainings/add-employee-training/add-employee-training.component';
import { UserListComponent } from '../administration-panel/components/user/user-list/user-list.component';
import { ListOfPersonsChartOrganizationComponent } from '../administration-panel/components/chart-organization/add-chart-organization/list-of-persons-chart-organization.component';
import { ChartOrganizationComponent } from '../administration-panel/components/chart-organization/chart-organization/chart-organization.component';
import { DisplayCharOrgComponent } from '../users-panel/display-char-org/display-char-org.component';
import { AddCompanyComponent } from '../administration-panel/components/company/add-company/add-company.component';
import { CompaniesListComponent } from '../administration-panel/components/company/companies-list/companies-list.component';
import { AddQualityPolicyComponent } from '../administration-panel/components/quality-policy/add-quality-policy/add-quality-policy.component';
import { QualityPolicyListComponent } from '../administration-panel/components/quality-policy/quality-policy-list/quality-policy-list.component';
import { ChooseQualityPolicyComponent } from '../administration-panel/components/quality-policy/choose-quality-policy/choose-quality-policy.component';
import { AddRegulationComponent } from '../administration-panel/components/regulations/add-regulation/add-regulation.component';
import { RegulationsListComponent } from '../administration-panel/components/regulations/regulations-list/regulations-list.component';
import { AddBaseProcessComponent } from '../administration-panel/components/process/add-base-process/add-base-process.component';
import { BaseProcessesComponent } from '../administration-panel/components/process/base-processes/base-processes.component';
import { AddProcessComponent } from '../administration-panel/components/process/add-process/add-process.component';
import { ProcessesComponent } from '../administration-panel/components/process/processes/processes.component';
import { DefineProcessComponent } from '../administration-panel/components/process/define-process/define-process.component';
import { DefineBaseProcessComponent } from '../administration-panel/components/process/define-base-process/define-base-process.component';
import { ProcessToDisplayComponent } from '../administration-panel/components/process/process-to-display/process-to-display.component';
import { DisplayQualityPoliciesComponent } from '../users-panel/display-quality-policies/display-quality-policies.component';

const routes: Routes = [
  {
    path: '', component: SidenavComponent, canActivate: [AuthGuard], children:
      [
        { path: '', component: AppComponent, canActivate: [AuthGuard] },
        {
          path: 'add-company', component: AddCompanyComponent, canActivate: [AuthGuard], data: {
            role: Role.SuperAdmin
          }
        },
        {
          path: 'add-company/:id', component: AddCompanyComponent, canActivate: [AuthGuard], data: {
            role: Role.SuperAdmin
          }
        },
        {
          path: 'companies-list', component: CompaniesListComponent, canActivate: [AuthGuard], data: {
            role: Role.SuperAdmin
          }
        },
        {
          path: 'users', component: UserListComponent, canActivate: [AuthGuard], data: {
            role: Role.Admin
          }
        },
        {
          path: 'add-quality-policy', component: AddQualityPolicyComponent, canActivate: [AuthGuard], data: {
            role: Role.Admin
          }
        },
        {
          path: 'add-quality-policy/:id', component: AddQualityPolicyComponent, canActivate: [AuthGuard], data: {
            role: Role.Admin
          }
        },
        {
          path: 'quality-policies', component: QualityPolicyListComponent, canActivate: [AuthGuard], data: {
            role: Role.Admin
          }
        },
        {
          path: 'choose-quality-policy', component: ChooseQualityPolicyComponent, canActivate: [AuthGuard], data: {
            role: Role.Admin
          }
        },
        {
          path: 'display-quality-policies', component: DisplayQualityPoliciesComponent, canActivate: [AuthGuard]
        },
        {
          path: 'add-regulation', component: AddRegulationComponent, canActivate: [AuthGuard], data: {
            role: Role.Admin
          }
        },
        {
          path: 'add-regulation/:id', component: AddRegulationComponent, canActivate: [AuthGuard], data: {
            role: Role.Admin
          }
        },
        { path: 'regulations', component: RegulationsListComponent, canActivate: [AuthGuard] },
        {
          path: 'list-of-persons-organization-chart', component: ListOfPersonsChartOrganizationComponent, canActivate: [AuthGuard], data: {
            role: Role.Admin
          }
        },
        { path: 'organization-chart', component: ChartOrganizationComponent, canActivate: [AuthGuard] },
        { path: 'display-organization-chart', component: DisplayCharOrgComponent, canActivate: [AuthGuard] },
        {
          path: 'add-base-process', component: AddBaseProcessComponent, canActivate: [AuthGuard], data: {
            role: Role.SuperAdmin
          }
        },
        {
          path: 'add-base-process/:id', component: AddBaseProcessComponent, canActivate: [AuthGuard], data: {
            role: Role.SuperAdmin
          }
        },
        {
          path: 'base-processes', component: BaseProcessesComponent, canActivate: [AuthGuard], data: {
            role: Role.SuperAdmin
          }
        },
        {
          path: 'add-process', component: AddProcessComponent, canActivate: [AuthGuard], data: {
            role: Role.Admin
          }
        },
        {
          path: 'add-process/:id', component: AddProcessComponent, canActivate: [AuthGuard], data: {
            role: Role.Admin
          }
        },
        {
          path: 'processes', component: ProcessesComponent, canActivate: [AuthGuard], data: {
            role: Role.Admin
          }
        },
        {
          path: 'define-process/:id', component: DefineProcessComponent, canActivate: [AuthGuard], data: {
            role: Role.Admin
          }
        },
        {
          path: 'define-base-process/:id', component: DefineBaseProcessComponent, canActivate: [AuthGuard], data: {
            role: Role.SuperAdmin
          }
        },
        {
          path: 'processes-to-display', component: ProcessToDisplayComponent, canActivate: [AuthGuard], data: {
            role: Role.User
          }
        },
        {
          path: 'trainings', component: TrainingsComponent, canActivate: [AuthGuard], data: {
            role: Role.Admin
          }
        },
        {
          path: 'add-training', component: AddTrainingComponent, canActivate: [AuthGuard], data: {
            role: Role.Admin
          }
        },
        {
          path: 'add-training/:id', component: AddTrainingComponent, canActivate: [AuthGuard], data: {
            role: Role.Admin
          }
        },
        {
          path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard], data: {
            role: Role.Admin
          }
        },
        {
          path: 'add-employee', component: AddEmployeeComponent, canActivate: [AuthGuard], data: {
            role: Role.Admin
          }
        },
        {
          path: 'add-employee/:id', component: AddEmployeeComponent, canActivate: [AuthGuard], data: {
            role: Role.Admin
          }
        },
        {
          path: 'employee-trainings/:type/:level/:id', component: EmployeeTrainingsComponent, canActivate: [AuthGuard], data: {
            role: Role.Admin
          }
        },
        {
          path: 'add-employee-training/:employeeType/:trainingId/:employeeId', component: AddEmployeeTrainingComponent, canActivate: [AuthGuard], data: {
            role: Role.Admin
          }
        },
        {
          path: 'add-employee-training/:employeeType/:trainingId/:employeeId/:id', component: AddEmployeeTrainingComponent, canActivate: [AuthGuard], data: {
            role: Role.Admin
          }
        },
        {
          path: 'display-employee-trainings', component: DisplayEmployeeTrainingsComponent, canActivate: [AuthGuard], data: {
            role: Role.Admin
          }
        }
      ]
  },
  {
    path: '', component: AuthLayoutComponent, children:
      [
        { path: 'auth', component: AuthComponent }
      ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
