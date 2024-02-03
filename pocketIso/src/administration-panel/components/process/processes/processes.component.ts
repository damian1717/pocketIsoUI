import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Process } from '../../../../administration-panel/models/process.model';
import { ProcessService } from '../../../../administration-panel/services/process.service';
import { AuthService } from '../../../../common/auth/auth.service';
import { Role } from '../../../../common/enums/user-role-codes';

@Component({
  selector: 'app-processes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.scss']
})
export class ProcessesComponent implements OnInit {

  managerProcesses: Process[] = [];
  mainProcesses: Process[] = [];
  supportingProcesses: Process[] = [];
  displayedColumns: string[] = ['name', 'edit', 'defineprocess'];
  showCompanyName = true;

  constructor(private processService: ProcessService, private router: Router, private authService: AuthService) { }

  ngOnInit() {

    const role = this.authService.getRole();

    if (role === Role.SuperAdmin) {
      this.getProcessesForSuperAdmin();
      this.displayedColumns = ['name', 'basic', 'edit', 'company', 'defineprocess'];
      this.showCompanyName = true;
    } else {
      this.getProcesses();
      this.displayedColumns = ['name', 'basic', 'edit', 'defineprocess'];
      this.showCompanyName = false;
    }
  }


  managerDataSource = new MatTableDataSource(this.managerProcesses);
  mainDataSource = new MatTableDataSource(this.mainProcesses);
  supportingDataSource = new MatTableDataSource(this.supportingProcesses);

  getProcesses() {
    this.processService.getProcesses().subscribe(x => {
      if (x && x.length) {
        const managers = x.filter(x => x.processType === 1);;
        this.managerProcesses = managers;
        this.managerDataSource.data = managers;

        const mains = x.filter(x => x.processType === 2);;
        this.mainProcesses = mains;
        this.mainDataSource.data = mains;

        const supportings = x.filter(x => x.processType === 3);;
        this.supportingProcesses = supportings;
        this.supportingDataSource.data = supportings;
      }
    })
  }

  getProcessesForSuperAdmin() {
    this.processService.getProcessesForSuperAdmin().subscribe(x => {
      if (x && x.length) {
        const managers = x.filter(x => x.processType === 1);
        this.managerProcesses = managers;
        this.managerDataSource.data = managers;

        const mains = x.filter(x => x.processType === 2);;
        this.mainProcesses = mains;
        this.mainDataSource.data = mains;

        const supportings = x.filter(x => x.processType === 3);;
        this.supportingProcesses = supportings;
        this.supportingDataSource.data = supportings;
      }
    })
  }

  redirectToEditProcess(id: string): void {
    this.router.navigateByUrl(`add-process/${id}`);
  }

  redirectToDefineProcess(id: string): void {
    this.router.navigateByUrl(`define-process/${id}`);
  }

}
